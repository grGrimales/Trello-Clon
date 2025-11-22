-- Permitir editar tarjetas (necesario para Drag & Drop)
create policy "Editar tarjetas" 
on cards for update
using (
  exists (
    select 1 from lists
    inner join boards on lists.board_id = boards.id
    where lists.id = cards.list_id
    and (boards.owner_id = auth.uid() or is_board_member(boards.id))
  )
);