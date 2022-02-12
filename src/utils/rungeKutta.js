// These functions solve the model using the Runge-Kutta method

function f(arr, obj) {
    let arr1 = Array(arr.length);
    let lambda = 1 / (obj.rho * (1 - obj.theta * (1 - obj.tau) * (1 - obj.psi)));
    let u = lambda * (arr[0] + arr[1] + arr[2]);
    let r = (1 - obj.tau) * (1 - obj.psi) * obj.rho * u;
    let g = arr[1] + obj.theta * r;
    let phi = obj.eta * arr[1] * (obj.capB - arr[1]);

    arr1[0] = arr[0] * (obj.gamma - g + obj.delta);
    arr1[1] = phi * (u - obj.ud);
    arr1[2] = arr[2] * (obj.xi * (arr[3] - obj.sigma * obj.rho * u) - g + obj.delta);
    arr1[3] = (1 - obj.tau) * (obj.rho * u + obj.i * arr[3]) - arr[2] - g - arr[3] * (g - obj.delta);

    return arr1;
}

function RungeKutta(arr, obj) {
    const dim = arr.length;
    const h = 0.05;
    const iterations = 20;
    let num1 = 0;
    let num2 = 0;

    const current = arr;

    let k = Array(4);
    k[0] = Array(dim);
    k[1] = Array(dim);
    k[2] = Array(dim);
    k[3] = Array(dim);
    const vals = Array(dim);

    for (let i = 0; i < iterations; i++) {
        k[0] = f(current, obj);

        for (let j = 0; j < dim; j++) {
            vals[j] = current[j] + (h * k[0][j]) / 2;
        }

        k[1] = f(vals, obj);

        for (let j = 0; j < dim; j++) {
            vals[j] = current[j] + (h * k[1][j]) / 2;
        }

        k[2] = f(vals, obj);

        for (let j = 0; j < dim; j++) {
            vals[j] = current[j] + h * k[2][j];
        }

        k[3] = f(vals, obj);

        for (let j = 0; j < dim; j++) {
            current[j] += h * (k[0][j] + 2 * k[1][j] + 2 * k[2][j] + k[3][j]) / 6;
        }
    }

    let lambda = 1 / (obj.rho * (1 - obj.theta * (1 - obj.tau) * (1 - obj.psi)));
    let u = lambda * (current[0] + current[1] + current[2]);
    let r = (1 - obj.tau) * (1 - obj.psi) * obj.rho * u;
    let g = current[1] + obj.theta * r;

    obj.kHatVals.push(g - obj.delta);
    num1 = obj.kHatVals.reduce((x, y) => x + y);
    num1 = num1 / (obj.time + 1);
    obj.kHatAve.push(num1);

    obj.uVals.push(u);
    num2 = obj.uVals.reduce((x, y) => x + y);
    num2 = num2 / (obj.time + 1);
    obj.uAve.push(num2);

    return current;

}

export default RungeKutta;