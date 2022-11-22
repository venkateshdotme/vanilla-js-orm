module.exports = class BaseModel {

    _attributes;
    _result;

    constructor(data, modelName) {

        if(this.constructor === BaseModel) {
            throw new Error("Abstract class cannot be instantiated!");
        }

        if(!data) {
            throw new Error(`${modelName} data property cannot be empty or null`);
        }

        this._data = data;
        this._model = modelName;
        this._isSelected = false;

        
    }

    select(key) {
        if(typeof(key) !== "string" && key.length <= 0) {
            throw new Error("key is required for select() method");
        }

        this._isSelected = true;
        this._result = this._data[key];

        return this;
    }

    attributes(attributes) {
        if(!Array.isArray(attributes)) {
            throw new Error(`attributes() method requires an array input instead ${typeof(attributes)} provided`);
        }

        if(attributes.length === 0 ) {
            throw new Error(`attributes() method requires minimum 1 value in input array`);
        }

        this._attributes = attributes;

        return this;
    }

    where(conditions) {
        if(typeof(conditions) !== "object" || Array.isArray(conditions) || conditions === null) {
            throw new Error(`Expected object as condition argument in where() method but received ${typeof(conditions)} type`);
        }

        if(!conditions || Object.keys(conditions).length === 0) {
            throw new Error(`Empty object passed as an argument to where() method`);
        }

        this._applyWhere(conditions, this.where.name)

        this._project(this._attributes, this.attributes.name);

        return this;
    }

    order(key, order = 1) {
        if(typeof(key) !== "string" && key.length <= 0) {
            throw new Error("key is required for order() method");
        }

        this._sortValues(key, order, this.order.name);

        return this;
    }

    _applyWhere(conditions, methodName) {
        if(this._isDataAndSelectInitialized(methodName)) {
            this._result = this._result.filter((el) => {
                return Object.keys(conditions).some(
                (key) => conditions[key] === el[key]
                );
            });
        }
    }

    _sortValues(key, order, methodName) {
        if(this._isDataAndSelectInitialized(methodName)) {
            this._result.sort((a, b) => {
                const keyA = a[key].toLowerCase().charAt(0);
                const keyB = b[key].toLowerCase().charAt(0);

                return keyA > keyB ? 1 : -1;
            });
        }
    }

    _project(attributes, methodName) {
        if(this._isDataAndSelectInitialized(methodName)) {
            this._result = this._result.map((el) => {
                return attributes.reduce((accumulator, current) => {
                accumulator[current] = el[current] || "";
                return accumulator;
                }, {});
            });
        }
    }

    _isDataAndSelectInitialized(methodName) {
        if(!this._isSelected) {
            throw new Error(`select() method needs to be called before invoking ${methodName}() method`);
        }

        return Array.isArray(this._result) && this._isSelected
    }

    findAll() {
        return Promise.resolve(this._result);
    }

    findOne() {
        return Promise.resolve(this._result[this._result.length - 1]);
    }
};
