import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TList } from '../../types/List';
import { useAppDispatch } from '../../utils/hooks/redux';
import {
  deleteListThunk,
  fetchListsThunk,
  updateListThunk,
} from '../../store/lists/listsThunk';
import { AuthContext } from '../../utils/AuthContext';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as RemoveIcon } from '../../assets/trash-can.svg';
import Textarea from '../ui/Textarea';

interface IList {
  list: TList;
}

const List = ({ list }: IList) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);
  const { id, title, createdAt } = list;
  const date = new Date(createdAt);
  const [listTitle, setListTitle] = useState(title);
  const [listIsReadOnly, setListIsReadOnly] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [listIsReadOnly]);

  const deleteListHandler = async () => {
    await dispatch(deleteListThunk({ id, userid: user!.id }));
    dispatch(fetchListsThunk(user!.id));
  };

  const updateListHandler = async () => {
    setListIsReadOnly(true);
    if (title === listTitle) return;
    await dispatch(updateListThunk({ id, title: listTitle, userid: user!.id }));
    dispatch(fetchListsThunk(user!.id));
  };

  const onListClickHandler = () => {
    if (!listIsReadOnly) return;

    navigate(`/lists/${id}`);
  };

  return (
    <div className="list">
      <Textarea
        isReadOnly={listIsReadOnly}
        classname={'list_title'}
        placeholder={'Title...'}
        value={listTitle}
        onChangeCallback={setListTitle}
        onClickCallback={onListClickHandler}
        onBlurCallback={updateListHandler}
      />
      <p>Created: {date.toDateString()}</p>
      <div className="list_controls">
        <button
          className="btn btn_secondary btn_edit"
          onClick={() => {
            setListIsReadOnly(false);
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

export default List;
