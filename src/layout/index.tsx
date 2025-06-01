
import { TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useMatches, useNavigate } from "react-router";

import { treeData} from '@/router/data'

export function BaseLayout() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const onChange = (val:string) => { 
    setValue(val)
    navigate(val)
  }
  const matches = useMatches()
  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matches.at(-1);
    if (lastRoute) {
      setValue(lastRoute.pathname)
    }
  },[])
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 20,
        overflow: "hidden",
      }}
    >
      <TreeSelect
        showSearch
        style={{ width: "100%" }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
      <div style={{ height: 0, flex: 1, overflow: "auto", paddingTop: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}
