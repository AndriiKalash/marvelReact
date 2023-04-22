import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";


// use finent-state machine instead  traditinal logic
const setContent = (process, data, Component) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />
        case 'loading':
            return <Spinner />
        case 'confirmed':
            return <Component data={data} />
        case 'error':
            return <ErrorMessage />
    }
}

export default setContent;
