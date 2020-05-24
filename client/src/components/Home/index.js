import React from 'react';
import MainMenu from '../MainMenu';
import Panel from '../Panel';
import './Home.scss';

const Home = () => {
    return (
        <section className="home">
            <Panel>
                <MainMenu />
            </Panel>
        </section>
    )
}

export default Home;