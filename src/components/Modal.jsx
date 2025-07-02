export const Modal = ({ 
  show, 
  onClose, 
  onConfirm, 
  title = "Confirmar acción",
  message = "¿Estás seguro de que quieres continuar?",
  confirmText = "Confirmar",
  cancelText = "Oh no!",
  confirmVariant = "primary",
  isLoading = false,
  contactName = null
}) => {
  
  // Si no se debe mostrar, no renderizar nada
  if (!show) return null;

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-exclamation-triangle text-warning me-2"></i>
              {title}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              disabled={isLoading}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            <p className="mb-3">
              {contactName ? (
                <>
                  Are you sure you want to delete the contact {' '}
                  <strong>{contactName}</strong>?
                </>
              ) : (
                message
              )}
            </p>
            <div className="alert alert-warning">
              <i className="fas fa-info-circle me-2"></i>
              This action cannot be reversed.
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={isLoading}
            >
              <i className="fas fa-times me-2"></i>
              {cancelText}
            </button>
            <button 
              type="button" 
              className={`btn btn-${confirmVariant}`}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Procesando...
                </>
              ) : (
                <>
                  {/* <i className="fas fa-trash me-2"></i> */}
                  {confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};