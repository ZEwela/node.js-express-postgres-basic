export class BadRequestError extends Error {
    constructor(error) {
        super(error.message);

        this.data = {error};
        this.statusCode = 400;
    }
}

export class UnauthorizedError extends Error {
    constructor(error) {
        super(error.message);

        this.data = {error};
        this.statusCode = 403;
    }
}

export class NotfoundError extends Error {
    constructor(error) {
        super(error.message);

        this.data = {error};
        this.statusCode = 404;
    }
}