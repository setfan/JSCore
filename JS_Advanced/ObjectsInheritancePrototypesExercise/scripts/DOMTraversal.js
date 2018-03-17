function traverse (selector) {
  let targetNode = $(selector);
  let maxDepth = 0;
  let deepestNode = targetNode;

  depthFirstSearch(0, targetNode);
  hightBottomToTargetNode(maxDepth, deepestNode);

  function hightBottomToTargetNode (remainingNods, currentNode) {
    if(remainingNods === -1){
      return;
    }
    currentNode.addClass('highlight');
    let parent = currentNode.parent();
    hightBottomToTargetNode(remainingNods -1, $(parent));
  }

  function depthFirstSearch (depht, currentNode) {

    if(depht > maxDepth){
      maxDepth = depht;
      deepestNode = currentNode;
    }

    let children = currentNode.children();
    for (let obj of children) {
      depthFirstSearch(depht + 1, $(obj))
    }
  }
}