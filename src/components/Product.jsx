import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Pencil, Trash2, Check, X } from "lucide-react";
import styles from "./Product.module.css";

export function Product({ product, onDelete, onUpdate }) {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(product.content);

  const isOwner = user?.id === product.user_id;

  const handleSave = () => {
    if (editValue.trim().length >= 3) {
      onUpdate(product.id, editValue);
      setIsEditing(false);
    } else {
      alert("A mensagem precisa ter pelo menos 3 caracteres.");
    }
  };

  const handleCancel = () => {
    setEditValue(product.content);
    setIsEditing(false);
  };

  // FUNÇÃO PARA AJUSTAR O TAMANHO DA FONTE DINAMICAMENTE
  const getTextClass = (text) => {
    const length = text.length;
    if (length > 120) return styles.extraSmall; // Texto muito longo
    if (length > 60) return styles.small;       // Texto médio
    return "";                                  // Texto curto
  };

  return (
    <div className={styles.productCard}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <textarea
            className={styles.editTextarea}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
          />
          <div className={styles.editActions}>
            <button className={styles.saveBtn} onClick={handleSave} title="Salvar">
              <Check size={18} /> Salvar
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel} title="Cancelar">
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* APLICAÇÃO DA CLASSE DINÂMICA AQUI */}
          <p className={`${styles.messageText} ${getTextClass(product.content)}`}>
            "{product.content}"
          </p>
          
          <div className={styles.cardFooter}>
            <small>Por: {product.author}</small>
            
            {isOwner && (
              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                  <Pencil size={18} />
                </button>
                <button className={styles.deleteBtn} onClick={() => onDelete(product.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}