import React from "react"

export const Modal = () => {
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Are you sure?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>If you delete this thing the entire universe will go down.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Oh no!</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Yes baby!</button>  
        </div>
      </div>
    </div>
  </div>
}