import mongoose from "mongoose";

const NegocioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    telefono: { type: String, default: "" },
    descripcion: { type: String, default: "" },
    direccion: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    afiliado: { type: Boolean, default: false },
    plan: {
      type: String,
      enum: ["GRATIS", "ESENCIAL", "ESTANDAR", "PREMIUM"],
      default: "GRATIS",
    },
    visitas: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Negocio ||
  mongoose.model("Negocio", NegocioSchema);
