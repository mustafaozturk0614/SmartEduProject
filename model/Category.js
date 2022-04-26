const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sulugify = require('slugify')

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },

    slug: {
        type: String,
        unique: true,
    }



});

CategorySchema.pre('validate', function (next) {
    this.slug = sulugify(this.name, {
        lower: true,
        strict: true
    })
    next();
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
