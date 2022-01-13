import './public-path';
import React, {FC, lazy, Suspense} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Spin} from 'antd';
import styled from "styled-components";

const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */'./pages/NotFound'));
const Forbidden = lazy(() => import(/* webpackChunkName: "forbidden" */'./pages/Forbidden'));

const Loading: FC = () => {
  return <LoadingStyle>
    <Spin/>
  </LoadingStyle>
}


const App: FC = () => {
  return <Suspense fallback={<Loading/>} >
    <Switch>
      <Route path="/404" component={NotFound}></Route>
      <Route path="/forbidden" component={Forbidden}></Route>
      <Redirect to='/404'/>
    </Switch>
  </Suspense>
}

export default App;

const LoadingStyle = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`