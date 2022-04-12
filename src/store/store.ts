import {createStore} from "redux";
import {connect} from "react-redux";
import rootReducer from "./reducers/rootReducer";

export const store = createStore(rootReducer)

export type tDispatch = typeof store.dispatch

const mapState = (state: any) => {

    return {
        currency: state?.valueReducer.value,
        items: state?.itemReducer?.items
    }
}

export const mapStateToProps = connect(mapState)