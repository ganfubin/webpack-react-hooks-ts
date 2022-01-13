import cloneDeep from 'lodash/cloneDeep'
export interface Tree {
  id: number,
  parentId?: number
  children?: Tree[]
  [key: string]: any
}


const listTwoTree = <T extends Tree>(list: T[]): T[] => {
  let treeList = cloneDeep(list ?? []);
  const map: { [key: string]: Tree } = {};
  let tree: T[] = [];
  treeList.forEach((item) => {
    map[item.id] = item
  })

  treeList.forEach((item) => {
    const pid = item.parentId?.toString();
    const parent = map[pid!]
    if (parent) {
      if (parent.children) {
        parent.children.push(item)

        parent.children = parent.children.sort((a, b) => {
          return a?.orderIdentifier ?? 0 - (b?.orderIdentifier ?? 0)
        })
      }
      if (!parent.children) parent.children = [item]
    } else {
      tree.push(item)
      tree = tree.sort((a, b) => a.orderIdentifier ?? 0 - (b.orderIdentifier ?? 0))
    }
  })

  return tree
}

export default listTwoTree