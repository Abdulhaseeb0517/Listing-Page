const myReducer = (state, action) => {
    switch (action.type) {
        case "check":
            if((state.count + 1) % 2 ===0)
                return { count: state.count + 1, oddEven: "Even"};
            else return { count: state.count + 1, addEven: "Odd" };
            default:
                return new Error();
    }
};
export default myReducer;