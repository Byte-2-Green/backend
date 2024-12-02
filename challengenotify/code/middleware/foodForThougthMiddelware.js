export async function checkIfWork(req, res, next){
    console.log('Good job! You are working hard!');
    next();
}