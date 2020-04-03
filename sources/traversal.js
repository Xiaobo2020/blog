const tree = {
  tag: 'html',
  children: [
    {
      tag: 'head',
      children: [
        {
          tag: 'title',
        },
        {
          tag: 'style',
        },
      ]
    },
    {
      tag: 'body',
      children: [
        {
          tag: 'h1'
        },
        {
          tag: 'div',
          children: [
            {
              tag: 'h2',
              children: [
                {
                  tag: 'span'
                }
              ]
            }
          ]
        },
        {
          tag: 'script',
        }
      ]
    }
  ]
}

const doWalkDFS = (tree) => {
  const walk = (vnode) => {
    console.log(vnode.tag);
    (vnode.children || []).forEach((item) => {
      walk(item);
    });
  };
  walk(tree);
};

const doWalkBFS = (tree) => {
  let queue = [tree];
  const walk = (vnode) => {
    console.log(vnode.tag);
    queue = queue.concat(vnode.children || []);
  };
  let item;
  while (item = queue.shift()) {
    walk(item);
  }
}

doWalkDFS(tree);
// html head title style body h1 div h2 span script

doWalkBFS(tree);
// html head body title style h1 div script h2 span