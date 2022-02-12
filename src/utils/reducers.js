import RungeKutta from './rungeKutta';
import Update from './update';

function reducer(state, action) {
    switch (action.type) {
        case "run":
            return { ...state, isRunning: true };
        case "stop":
            return { ...state, isRunning: false };
        case "reset":
            return { ...state, isRunning: false, time: 0, govHatVals: [], govHatAve: [], kHatVals: [], kHatAve: [], uVals: [], uAve: [] };
        case "iterate":
            return { ...state, time: state.time + 1, gamma: Update(state.govHatVals, state.govHatAve, state.time + 1, state.gamma0, state.sd), govHatVals: state.govHatVals, govHatAve: state.govHatAve, stateVals: RungeKutta(state.stateVals, state) };
        case "increasegamma0":
            return { ...state, gamma0: (state.gamma0 < 0.05) * (state.gamma0 + 0.01) + (state.gamma0 >= 0.05) * 0.05 };
        case "decreasegamma0":
            return { ...state, gamma0: (state.gamma0 > 0.02) * (state.gamma0 - 0.01) + (state.gamma0 <= 0.02) * 0.02 };
        case "increasesd":
            return { ...state, sd: (state.sd < 0.01) * (state.sd + 0.01) + (state.sd >= 0.01) * 0.01 };
        case "decreasesd":
            return { ...state, sd: (state.sd > 0.0) * (Math.abs(state.sd - 0.01)) + (state.sd <= 0.0) * 0.0 };
        case "increasesigma":
            return { ...state, sigma: (state.sigma < 2) * (state.sigma + 0.1) + (state.sigma >= 2) * 2 };
        case "decreasesigma":
            return { ...state, sigma: (state.sigma > 0.1) * (state.sigma - 0.1) + (state.sigma <= 0.1) * 0.1 };
        case "increasexi":
            return { ...state, xi: (state.xi < 10000) * (state.xi + 1) + (state.xi >= 10000) * 10000 };
        case "decreasexi":
            return { ...state, xi: (state.xi > 1) * (state.xi - 1) + (state.xi <= 1) * 1 };
        case "increaseud":
            return { ...state, ud: (state.ud < 0.9) * (state.ud + 0.05) + (state.ud >= 0.9) * 0.9 };
        case "decreaseud":
            return { ...state, ud: (state.ud > 0.65) * (state.ud - 0.05) + (state.ud <= 0.65) * 0.65 };
        case "increaseeta":
            return { ...state, eta: (state.eta < 5000) * (state.eta + 50) + (state.eta >= 5000) * 5000 };
        case "decreaseeta":
            return { ...state, eta: (state.eta > 50) * (state.eta - 50) + (state.eta <= 50) * 50 };
        default:
            throw new Error();
    }
}

export default reducer;