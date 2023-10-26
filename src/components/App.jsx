import { useEffect, useState, lazy } from "react";
import { Route, Routes } from "react-router-dom";
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
  console.log(sortedData)

  
  return (
    <>

      {!isLoading && (
        <Routes>
          <Route path='/' element={<SharedLayout tabs={sortedData} />}>
            {sortedData.map(tab => {
              const Page = lazy(() => import(`./${tab.path}`));
              return (
                <Route key={tab.id + tab.order} path={tab.id} element={<Page />} />
              )
            })}
            <Route path="*" element={<div>Not Found</div> } />
          </Route>
      </Routes>
      )}
    </>
  );
};