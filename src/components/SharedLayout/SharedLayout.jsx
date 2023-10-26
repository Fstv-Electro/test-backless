import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Container, Header, Links } from "./SharedLayout.styled";


export const SharedLayout = ({ tabs }) => {

    const random = Math.floor(Math.random() * 10000);

    return (
        <Container>
            <Header>
                <nav>
                    {
                        tabs.map(tab => (
                            <Links key={tab.id + random} to={tab.id}>
                                {tab.title}
                            </Links>
                        ))
                    }
                </nav>
            </Header>
            <Suspense fallback={<div>loading..</div>}>
                <main>
                    <Outlet/>
                </main>
            </Suspense>
        </Container>
    )
}