import { createStore } from "redux";

// DOM 조작
const btnOn = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnReset = document.querySelector('#reset');
const modal = document.querySelector('.container')

// 액션의 이름을 정의 -1
const ON_OFF = 'ON_OFF';
const UP = "UP";
const DOWN = 'DOWN';
const RESET = "RESET";

// 액션 함수 정의 -2
const onOff = () => ({ type: ON_OFF});
const upUp = difference => ({type: UP, difference});
const down = () => ({type: DOWN});
const reset = () => ({type: RESET});

// 초기 상태 값 설정 -3
const initialState = {
    toggle:false,
    counter: 0,
}

// 리듀서 함수 정의-4

function reducer (state=initialState, action) {
    switch (action.type) {
        case ON_OFF :
            return {
                ...state,
                toggle:!state.toggle
            }
        case UP :
            return {
                ...state,
                counter: state.counter + action.difference
            }
        case DOWN :
            return {
                ...state,
                counter: state.counter - 1
            }
        case RESET :
            return {
                ...state,
                counter: 0
            }
        default :
            return state
    }
}

// 스토어를 만들어준다. -5
// 임폴트 하는거 잊지말레이~ createStore 임폴트!
const store = createStore(reducer);

// render 함수 만들기
const render = () => {
    const state = store.getState();
    if(state.toggle) {
        btnOn.classList.add("on")
        btnOn.innerText = "ON"
        modal.classList.add("none")

    } else {
        btnOn.classList.remove("on")
        btnOn.innerText = "OFF"
        modal.classList.remove("none")

    }
    counter.innerText = state.counter;
};

render()

// 구독하기 - 6
store.subscribe(render);

// 액션 발생시키기
btnOn.onclick = () => {
    store.dispatch(onOff())
}

btnUp.onclick = () => {
    store.dispatch(upUp(1));
}

btnDown.onclick = () => {
    store.dispatch(down())
}

btnReset.onclick = () => {
    store.dispatch(reset())
}
