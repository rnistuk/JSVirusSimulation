
/**
 * @return {number}
 */
function DS(beta, sigma, gamma, S, E, I, R) {
    return (-beta * S * I / (S + E + I + R));
}

/**
 * @return {number}
 */
function DE(beta, sigma, gamma, S, E, I, R) {
    return (beta * S * I / (S + E + I + R)) - sigma * E;
}

/**
 * @return {number}
 */
function DI(beta, sigma, gamma, S, E, I, R) {
    return sigma * E - gamma * I;
}

/**
 * @return {number}
 */
function DR(beta, sigma, gamma, S, E, I, R) {
    return gamma * I;
}

function next(beta, sigma, gamma, S, E, I, R, N) {
    dt = 1.0 / N;
    for (let i=0; i<N; ++i) {
        let dS = DS(beta, sigma, gamma, S, E, I, R);
        let dE = DE(beta, sigma, gamma, S, E, I, R);
        let dI = DI(beta, sigma, gamma, S, E, I, R);
        let dR = DR(beta, sigma, gamma, S, E, I, R);
        S += dS * dt;
        E += dE * dt;
        I += dI * dt;
        R += dR * dt;
    }
    return {S,E,I,R};
}

function generateDataPoints(beta, sigma, gamma, S, E, I, R) {
    let day = 0;
    let pts = [];
    while (E > 0.5 || I > 0.5 ) {
        pts.push([day,
            Math.round(S),
            Math.round(E),
            Math.round(I),
            Math.round(R)]);
        const {E: E0, I: I0, R: R0, S: S0} = next(beta, sigma, gamma, S, E, I, R, 100);
        S = S0;
        E = E0;
        I = I0;
        R = R0;
        day = day + 1;
    }
    return pts;
}

//var pts = generateDataPoints(3.5, 1.0, 1.0, 100000, 1, 0, 0);
//console.log(pts);

