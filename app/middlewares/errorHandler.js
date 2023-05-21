
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode: 500;

    switch (statusCode) {
        case 400:
            res.json({
                title: "validation error",
                error: err.message,
                stackTrace: err.stack
            });
        case 404:
            res.json({
                title: "not found",
                error: err.message,
                stackTrace: err.stack
            });
        case 401:
        res.json({
            title: "unauthorized",
            error: err.message,
            stackTrace: err.stack
        });
        case 403:
            res.json({
                title: "forbidden",
                error: err.message,
                stackTrace: err.stack
            });
        case 500:
            res.json({
                title: "server error",
                error: err.message,
                stackTrace: err.stack
            });
        default:
            console.log("NO ERROR: ", statusCode);
    }

}