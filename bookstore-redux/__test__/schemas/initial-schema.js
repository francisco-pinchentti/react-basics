export default {
    properties: {
        books: {
            type: "array",
            items: {
                type: "object",
                required: ["title", "isbn"],
                properties: {
                    id: {
                        type: "string"
                    },
                    title: {
                        type: "string"
                    },
                    isbn: {
                        type: "string"
                    },
                    summary: {
                        type: "string"
                    }
                }
            }
        },
        requestStatus: {
            type: "object",
            properties: {
                postBook: {
                    type: "object",
                    properties: {
                        pending: {
                            type: "boolean"
                        },
                        error: {
                            type: "boolean"
                        }
                    }
                },
                putBook: {
                    type: "object",
                    properties: {
                        pending: {
                            type: "boolean"
                        },
                        error: {
                            type: "boolean"
                        }
                    }
                },
                delBook: {
                    type: "object",
                    properties: {
                        pending: {
                            type: "boolean"
                        },
                        error: {
                            type: "boolean"
                        }
                    }
                },
                getBooks: {
                    type: "object",
                    properties: {
                        pending: {
                            type: "boolean"
                        },
                        error: {
                            type: "boolean"
                        }
                    }
                },
                clearStore: {
                    type: "object",
                    properties: {
                        pending: {
                            type: "boolean"
                        },
                        error: {
                            type: "boolean"
                        }
                    }
                },
                loadSampleData: {
                    type: "object",
                    properties: {
                        pending: {
                            type: "boolean"
                        },
                        error: {
                            type: "boolean"
                        }
                    }
                }
            }
        },
        lastUpdateTime: {
            type: "object"
        }
    },
    required: ["books", "requestStatus", "lastUpdateTime"]
};
