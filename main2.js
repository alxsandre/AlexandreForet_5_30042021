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

  //add nodes to dom
  function commitRoot() {
      commitWork(wipRoot.child);
      wipRoot = null;
  }

  function commitWork(fiber) {
      //if no fiber, nothing, return nothing
      if (!fiber) {
          return
      }
      //take parent of the fiber
      const domParent = fiber.parent.dom;
      //add child on the parent
      domParent.appendChild(fiber.dom);
      //Repeat that for child and sibling
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
    }
    nextUnitOfWork = wipRoot;
  }

  //Break the work into small units, after we finish each unit we'll let the browser interrupt the rendering
  
  let nextUnitOfWork = null;
  let wipRoot = null;

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
    let index = 0;
    let prevSibling = null;

    while (index < elements.length) {
        const element =  elements[index];

        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }

    //we add it to the fiber tree as a child or as a sibling
    if (index === 0) {
        fiber.child = newFiber;
    } else {
        prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++
    }


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

  const Didact = {
    createElement,
    render
  };
  
  /** @jsx conversion Didact.createElement */
  const element = Didact.createElement(
    "div",
    { id: "foo" },
    Didact.createElement("a", null, "bar"),
    Didact.createElement("b")
  )
  const container = document.getElementById("root");
  Didact.render(element, container);
  

