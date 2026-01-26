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

  // Lógica de tamanho de fonte para ocupar bem o espaço do card
  const getTextClass = (text) => {
    const length = text.length;
    if (length > 120) return styles.extraSmall; 
    if (length > 60) return styles.small;       
    return "";                                  
  };

  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.messageWrapper}>
          <p className={`${styles.messageText} ${getTextClass(product.content)}`}>
            "{product.content}"
          </p>
        </div>
        
        <div className={styles.cardFooter}>
          <span className={styles.authorName}>Por: {product.author}</span>
          
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
      </div>

      {/* MODAL DE EDIÇÃO CENTRALIZADO (Aparece fora do card) */}
      {isEditing && (
        <div className={styles.modalOverlay} onClick={handleCancel}>
          <div className={styles.centeredEditBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={handleCancel}>
              <X size={24} />
            </button>
            
            <div className={styles.formContainer}>
              <h2>Editar sua mensagem</h2>
              <textarea
                className={styles.modalTextarea}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
              />
              <button className={styles.saveBtnModal} onClick={handleSave}>
                <Check size={18} /> Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}