'use client';

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { useActionState, useTransition } from 'react';
import * as actions from '@/actions';

export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, {
    errors: {},
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startFormTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startFormTransition(() => action(formData));
  };

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>

      <PopoverContent>
        {/* use onSubmit to ensure form data hangs around after submit */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="name"
              labelPlacement="outside"
              placeholder="name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(' and ')}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your Topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(' and ')}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded-lg">
                {formState.errors._form.join(', ')}
              </div>
            ) : null}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
