import React, {ComponentType, lazy, LazyExoticComponent, Suspense} from 'react';
import { BrowserRouter, Route as BrowserRoute, Switch } from 'react-router-dom';

// React framework level optimization using lazy-loading. Refer to my blog here: https://ahamedblogs.wordpress.com/2020/04/24/react-framework-level-optimization-using-lazy-loading-and-suspense/
const MainPage = lazy(() => import(/* webpackChunkName: "App" */ './App'));

type Route = {
    path: string;
    Component: LazyExoticComponent<ComponentType<any>>;
};

const routes: Route[] = [
    { path: '/', Component: MainPage },
];

const AppContainer: React.FC = () => (
    <BrowserRouter>
        <Switch>
            {
                routes.map((route: Route, index: number): JSX.Element => {
                    return (
                        <BrowserRoute
                            key={route.path + index}
                            exact
                            path={route.path}
                        >
                            <Suspense fallback={<div>component loading</div>}>
                                <route.Component />
                            </Suspense>
                        </BrowserRoute>
                    );
                })
            }
        </Switch>
    </BrowserRouter>
);

export default AppContainer;