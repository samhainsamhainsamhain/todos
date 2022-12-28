import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from '../../types/List';
import { useAppDispatch } from '../../utils/hooks/redux';
import {
  deleteListThunk,
  fetchListsThunk,
  updateListThunk,
} from '../../store/todoLists/todoListsThunk';
import { AuthContext } from '../../utils/AuthContext';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as RemoveIcon } from '../../assets/trash-can.svg';

interface IList {
  todoListItem: List;
}

const ListItem = ({ todoListItem }: IList) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);
  const { id, title, createdAt } = todoListItem;
  const date = new Date(createdAt);
  const [listTitle, setListTitle] = useState(title);
  const [listIsEditable, setListIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [listIsEditable]);

  const deleteListHandler = async () => {
    await dispatch(deleteListThunk({ id, userid: user!.id }));
    dispatch(fetchListsThunk(user!.id));
  };

  const updateListHandler = async () => {
    setListIsEditable(false);
    if (title === listTitle) return;
    await dispatch(updateListThunk({ id, title: listTitle, userid: user!.id }));
    dispatch(fetchListsThunk(user!.id));
  };

  const onListClickHandler = () => {
    if (listIsEditable) return;
    navigate(`/lists/${id}`);
  };

  return (
    <div className="list">
      <input
        className={'list_title' + ' ' + (listIsEditable ? 'editable' : '')}
        ref={inputRef}
        value={listTitle}
        spellCheck={false}
        onBlur={() => {
          updateListHandler();
        }}
        onChange={(e) => {
          setListTitle(e.currentTarget.value);
        }}
        onClick={onListClickHandler}
      />
      <p>Created: {date.toDateString()}</p>
      <div className="list_controls">
        <button
          className="btn btn_secondary btn_edit"
          onClick={() => {
            setListIsEditable(true);
          }}
        >
          <EditIcon />
        </button>
        <button
          className="btn btn_secondary btn_remove"
          onClick={deleteListHandler}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
