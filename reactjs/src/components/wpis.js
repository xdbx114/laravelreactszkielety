export default function Wpis() {//To dopiero szablon szczegółów wpisu oraz sekcji komentarzy. 
  return (
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">Tytuł wpisu</h5>
          <h6 class="card-subtitle mb-2 text-muted">Autor | ID użytkownika</h6>
          <p class="card-text">Treść wpisu</p>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">Komentarze</h5>
          <ul class="list-group">
            <li class="list-group-item">
              <h6 class="mb-0">Autor komentarza 1</h6>
              <p class="mb-2">Treść komentarza 1</p>
            </li>
            <li class="list-group-item">
              <h6 class="mb-0">Autor komentarza 2</h6>
              <p class="mb-2">Treść komentarza 2</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">Dodaj komentarz</h5>
          <form>
            <div class="form-group">
              <label for="author">Autor</label>
              <input type="text" class="form-control" id="author"/>
            </div>
            <div class="form-group">
              <label for="comment">Treść komentarza</label>
              <textarea class="form-control" id="comment" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Dodaj</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}