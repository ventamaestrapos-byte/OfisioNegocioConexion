import mongoose from "mongoose";

const PromocionSchema = new mongoose.Schema(
  {
    negocio: { type: mongoose.Schema.Types.ObjectId, ref: "Negocio", required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, default: "" },
    precio: { type: Number, default: null },
    fotoUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    fechaFin: { type: Date, default: null },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Promocion ||
  mongoose.model("Promocion", PromocionSchema);
