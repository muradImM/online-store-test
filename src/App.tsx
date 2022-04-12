import React, {Component} from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import {CART} from "./util/consts";
import Board from "./Components/Board/Board";
import Header from "./Components/Header/Header";
import SingleItem from "./Pages/SingleItemPage/SingleItem";
import getCategories from "./api/getCategories";
import TestComponent from "./Components/CartTemplate/CartTemplate";

class App extends Component {

    state = {
        categories: [],
        categoriesToDrill: [],
    }

    componentDidMount() {
        getCategories()
            .then(cat => {
                return cat.categories.map((e: any) => {
                    // @ts-ignore
                    this.setState(state => ({...state, categoriesToDrill: [...state.categoriesToDrill, e.name]}))
                    return e.name === "all"
                        ? <Route key={e.name} path={"/"} element={<Board path={e.name} heading={e.name}/>}/>
                        : <Route key={e.name}>
                            <Route path={e.name} element={<Board path={e.name} heading={e.name}/>}/>
                            <Route path={`${e.name}/:id`} element={<SingleItem/>}/>
                        </Route>
                })
            })
            .then(e => this.setState((state) => ({...state, categories: e})))
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.categories.length !== 0 && <>
                        <Header categories={this.state.categoriesToDrill}/>
                        <Routes>
                            {this.state?.categories?.map(e => e)}
                            <Route path={CART} element={<TestComponent type={"page"}/>}/>
                        </Routes>
                    </>
                }
            </div>
        );
    }
}

export default App;
