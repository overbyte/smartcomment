'use client';

import { useActionState, startTransition } from 'react';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

  // Using onSubmit instead of action on <form> will opt out of the form reset
  // https://github.com/facebook/react/issues/29034#issuecomment-2143595195
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
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

            <FormButton isLoading={isPending}>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
