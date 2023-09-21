



export class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    pagination() {
        //1 - pag
        const PAGE_LIMIT = this.queryString.page ? 3 : true;
        const PAGE_NUMBER = this.queryString.page * 1 || 1
        if (PAGE_NUMBER <= 0) PAGE_NUMBER = 1
        const SKIP = (PAGE_NUMBER - 1) * PAGE_LIMIT
        this.mongooseQuery.skip(SKIP).limit(PAGE_LIMIT)
        return this
    }

    filter() {
        let filterObj = { ...this.queryString }
        const delObj = ['page', 'sort', 'fields', 'keyword']
        delObj.forEach(ele => {
            delete filterObj[ele]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj)
        // const mongooseQuery = usersModel.find(filterObj).skip(SKIP).limit(PAGE_LIMIT)
        this.mongooseQuery.find(filterObj)
        return this
    }

    sort() {
        if (this.queryString.sort) {
            let sortedQery = this.queryString.sort.split(",").join(" ")
            this.mongooseQuery.sort(sortedQery)
        }
        return this
    }

    //4 - search
    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { name: { $regex: this.queryString.keyword, $options: "i" } },
                    { description: { $regex: this.queryString.keyword, $options: "i" } },
                ]
            })
        }
        return this
    }

    //5 - fields
    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(",").join(" ")
            fields = fields.replace("password", "")
            this.mongooseQuery.select(fields)
        } else {
            this.mongooseQuery.select('-password')
        }
        return this
    }
}