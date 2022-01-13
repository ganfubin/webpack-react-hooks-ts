import {useEffect, useState} from "react";

type IconList = string[]
const useMenuIconList = (): [IconList] => {
  const [iconList, setIconList] = useState<IconList>([])

  useEffect(() => {
    const list:IconList = []
    const symbolEle = document.getElementsByTagName('svg')?.[0]?.getElementsByTagName('symbol');

    for (let i = 0;  i < symbolEle.length; i++) {
      symbolEle?.[i].id && list.push(symbolEle[i].id.replace('icon-',''))
    }
    setIconList(list)
  }, [])

  return [iconList]
}

export default useMenuIconList