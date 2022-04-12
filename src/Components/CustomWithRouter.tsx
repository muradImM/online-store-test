import {
    useNavigate,
    useParams,
} from "react-router-dom";
import React from "react";

export const withParamsRouter = (Component: any) => {
    return (props: any) => {
        const params = useParams()

        return (
            <Component
                params={params}
                {...props}
            />
        )
    }
}

export const withNavigateRouter = (Component: any) => {
    return (props: any) => {
        const navigate = useNavigate()

        return (
            <Component
                navigate={navigate}
                {...props}
            />
        )
    }
}

