//return object
function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "object" ? child : createTextElement(child)
        )
      }
    };
  }
  
  function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    };
  }
  
  //create fiber for the dom
  function createDom(fiber) {
    const dom =
      fiber.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(fiber.type);
    const isProperty = key => key !== "children";
    Object.keys(fiber.props) //return children or id, class etc.
      .filter(isProperty) // return all props but no childrens
      .forEach(name => {
        dom[name] = fiber.props[name];
      }); //added props (id, class...) at the dom
      return dom
  }

  const isEvent = k => k.startsWith('on');
  const eventName = k => k.toLowerCase().substring(2);
  const isProperty = k => k != 'children';
  function updateDom(dom, prevProps, nextProps) {
      //delete old properties
      Object.keys(prevProps)
        .filter(isProperty)
        .forEach(name => {
            if (!(name in nextProps)) {
              if (isEvent(name)) {
                dom.removeEventListener(eventName(name), prevProps[name])
              } else {
                dom[name] = '';
              }
            }
        })

        //add or update new properties
        Object.keys(nextProps)
        .filter(isProperty)
        .forEach(name => {
            if (prevProps[name] != nextProps[name]) {
              if (isEvent(name)) {
                if (prevProps[name]) {
                  dom.removeEventListener(eventName(name), prevProps[name])
                }
                dom.addEventListener(eventName(name), nextProps[name])
              } else {
                dom[name] = nextProps[name];
              }
            }
        })
  }

  //add nodes to dom
  function commitRoot() {
      deletions.forEach(commitWork);
      commitWork(wipRoot.child);
      currentRoot = wipRoot; //When all the tree is commited, we want save the currentRoot
      wipRoot = null;
  }

  function commitWork(fiber) {
      //if no fiber, nothing, return nothing
      if (!fiber) {
          return
      }
      //take parent of the fiber
      const domParent = fiber.parent.dom;
      if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
          //add child on the parent
          domParent.appendChild(fiber.dom)
      } else if (fiber.effectTag === 'DELETION') {
          domParent.removeChild(fiber.dom)
            return
      } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
          updateDom(fiber.dom, fiber.alternate.props, fiber.props)
      }
      //add child, sibling
      commitWork(fiber.child);
      commitWork(fiber.sibling);
  }
  //we set nextUnitOfWork to the root of the fiber tree
  function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
        alternate: currentRoot //it's a reference at the previous tree
    }
    nextUnitOfWork = wipRoot;
    deletions = [];
  }

  //Break the work into small units, after we finish each unit we'll let the browser interrupt the rendering
  
  let nextUnitOfWork = null;
  let wipRoot = null;
  let currentRoot = null;
  let deletions = [];

  function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaining() < 1 //requestIdleCallback give us deadline parameter to check how much time we have until the browser needs to take control again
    };
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
  }
  requestIdleCallback(workLoop) //action workloop when the main thread is idle

  //performs the work but also returns the next unit of work
  function performUnitOfWork(fiber) {
    //add dom node
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    } //If we haven't fiber dom so create fiber to the dom
    console.log('fiber', fiber)
    //create new fibers
    const elements = fiber.props.children;

    reconcileChildren(fiber, elements)
    // return next unit of work
    //We try first with the child, then with the sibling, then with with the uncle, and so on
    if (fiber.child) {
        return fiber.child
    }
    
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }

    return null
  }



  function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child; //get child of the old tree
    let prevSibling = null;

    while(
        index < elements.length ||
        oldFiber != null
        ) {
        const element =  elements[index];
        const sameType = oldFiber && element && element.type === oldFiber.type
        let newFiber = null;

        if (sameType) {
            //modification
            newFiber = {
                type: element.type,
                props: element.props,
                parent: wipFiber,
                dom: oldFiber.dom,
                alternate: oldFiber,
                effectTag: 'UPDATE'
            }
        }

        if (element && !sameType) {
            //add element
            newFiber = {
                type: element.type,
                props: element.props,
                parent: wipFiber,
                dom: null,
                alternate: null,
                effectTag: 'PLACEMENT'
            }
        }

        if (oldFiber && !sameType) {
            //Delete oldfiber
            oldFiber.effectTag = "DELETION"
            deletions.push(oldFiber)
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

    //we add it to the fiber tree as a child or as a sibling
    if (index === 0) {
        wipFiber.child = newFiber;
    } else if (element) {
        prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++
    }
  }



  const Didact = {
    createElement,
    render
  };
  
  /** @jsx conversion Didact.createElement */
  function step1() {
    console.log('step1')
  const element = Didact.createElement(
    "div",
    { id: "foo" },
    Didact.createElement("a", null, "bar"),
    Didact.createElement("button", {onclick: step2}, "click")
  )
  const container = document.getElementById("root");
  Didact.render(element, container);
  }
  step1()

  function step2() {
    console.log('step2')
    const element = Didact.createElement(
      "div",
      { id: "foo" },
      Didact.createElement("a", null, "yoooo"),
      Didact.createElement("button", {onclick: step1}, "come back")
    )
    const container = document.getElementById("root");
    Didact.render(element, container);
  }
  
  

