import { useEffect, useState, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SharedLayout } from "./SharedLayout/SharedLayout";

export const App = () => {
  const [tabsData, setTabsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  async function fetchTabs() {
    try {
      setIsLoading(true);
      const data = await import('../service/tabs.json');
      setTabsData(data.tabs);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false)
    }
  }
  fetchTabs()
}, [])
  const sortedData = tabsData.sort((a, b) => a.order - b.order);

  const getRandom = () => {
    const random = Math.floor(Math.random() * 10000);
    return random;
  }
  
  return (
    <>

      {!isLoading && (
        <Routes>
          <Route path='/' element={<SharedLayout tabs={sortedData} />}>
            {sortedData.map((tab, i)=> {
              const Page = lazy(() => import(`./${tab.path}`));
              if (i === 0) {
                return (
                  <>
                    <Route key={getRandom()} index element={ <Navigate to={tab.id} /> }/>
                    <Route key={getRandom()} path={tab.id}  element={<Page />} />
                  </>
                )
              }
              return (
                <Route key={getRandom()} path={tab.id} element={<Page />} />
              )
            })}
            <Route path="*" element={<div>Not Found</div> } />
          </Route>
      </Routes>
      )}
    </>
  );
};
