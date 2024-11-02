import { useRef } from "react";

interface IPlantAddFormProps {
  onSubmit: CallableFunction
}

export default function NewPlantForm(props: IPlantAddFormProps): JSX.Element {
  const { onSubmit, } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  function submitHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;

    onSubmit(name, description);
  }

  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" name="name" id="name" />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea ref={descriptionRef} name="description" id="description" />
      </div>

      <button type="button" onClick={submitHandler}>Submit</button>
    </form>
  );
}
