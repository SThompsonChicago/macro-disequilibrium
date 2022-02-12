function Update(arr1, arr2, n, gamma0, sd) {
    if (sd === 0) {
        arr1.push(gamma0);
        arr2.push(gamma0);

        return gamma0;

    } else {
        var num = gamma0 + sd * 3.4641016 * (Math.random() - 0.5);
        var num2 = 0;
        arr1.push(num);
        num2 = arr1.reduce((x, y) => x + y);
        num2 = num2 / n;
        arr2.push(num2);

        return num;
    }
}

export default Update;