module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nama_hewan: String,
      jenis_hewan: String,
      jenis_kelamin: String,
      tanggal_lahir: Date,
      bio: String,
      image: String,
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  return mongoose.model("hewan", schema);
};
