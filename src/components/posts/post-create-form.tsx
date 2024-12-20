'use client';

import { useActionState, startTransition } from 'react';
import {
  Button,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  // pass slug to createPost()
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    startTransition(() => {
      const formData = new FormData(event.currentTarget);
      startTransition(() => action(formData));
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>

            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />

            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />

            {!!formState.errors._form && (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(',')}
              </div>
            )}

            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
