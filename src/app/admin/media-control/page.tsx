'use client';
import useConfirmation from '@/components/context/delete-modal';
import { CloseBtn, CloseIcon } from '@/components/reuseable/btn';
import Modal2 from '@/components/reuseable/modal2';
import PlayerBox from '@/components/reuseable/player-box';
import sonner from '@/components/reuseable/sonner';
import { Button, Input } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import {
  useDeleteMediaMutation,
  useGetMediaQuery,
  useMediaStoreMutation,
} from '@/redux/api/admin/mediaApi';
import React, { useState } from 'react';
import { helpers } from '@/lib';
import { useFormFields } from '@/hooks';
import ErrorText from '@/components/reuseable/error-text';
import { NoVideoFound } from '@/components/reuseable/table-no-item';

export default function MediaControl() {
  const { confirm } = useConfirmation();
  const [isStore, setIsStore] = useState(false);
  const { data: media } = useGetMediaQuery({});
  const [mediaStore, { isLoading: mediaLoading }] = useMediaStoreMutation();
  const [deleteMedia, { isLoading: deleteLoading }] = useDeleteMediaMutation();
  const linkForm = useFormFields({
    link: '',
  });

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: 'You are going to delete this video',
      description: 'After deleting, users wont be able to find this video in your app',
    });
    if (con) {
      await deleteMedia(id).unwrap();
    }
  };

  //  == handleMedia ==
  const handleMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = linkForm.validate({
      link: 'Link is required',
    });
    if (!ok) return;

    const data = helpers.fromData(linkForm.formData);
    const res = await mediaStore(data).unwrap();
    if (res.status) {
      sonner.success('Media Added Successfully', 'You can now use this media in your app');
      setIsStore(false);
      linkForm.reset()
    }
  };


  return (
    <div>
      <Navber title="Content & Media Control" />
      <div className="bg-figma-card p-6 rounded-xl">
        <ul className="flex justify-between items-center mb-8">
          <li className="text-2xl font-medium">Promo Video</li>
          {media?.length > 0 && (
            <li>
              <Button
                disabled={deleteLoading}
                onClick={() => handleDelete(media[0]?.id)}
                variant="primary"
                className="!px-10 rounded-md disabled:opacity-100"
              >
                Delete
              </Button>
            </li>
          )}

        </ul>
        <div className="max-w-7xl  mx-auto">
          {media?.length > 0 ? (
            <PlayerBox link={media[0]?.link} />
          ) : (<NoVideoFound />)}
        </div>
      </div>
      {media?.length === 0 && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setIsStore(true)}
            variant="primary"
            className="w-fit lg:min-w-md rounded-md"
          >
            Add New Video
          </Button>
        </div>
      )}
      {/* ============= Add New Video ========== */}
      <Modal2 open={isStore} setIsOpen={setIsStore}>
        <form onSubmit={handleMedia}>
          <div className="mb-10">
            <h1 className="text-xl font-semibold text-center">Add New Video</h1>
          </div>
          <CloseIcon
            className="mt-2 mr-3"
            onClose={() => {
              setIsStore(false);
              linkForm.reset()
            }}
          />
          <div>
            <Input
              className="bg-figma-input h-10 border-none"
              placeholder="Video URL"
              value={linkForm.formData.link}
              onChange={(e) => linkForm.change('link', e.target.value)}
            />
            <ErrorText error={linkForm?.errors?.link} />
          </div>
          <div className="space-y-2 mt-10">
            <CloseBtn
              onClose={() => {
                setIsStore(false);
                linkForm.reset()
              }}
            />
            <Button
              disabled={mediaLoading}
              type='submit'
              variant="primary"
              className="w-full"
            >
              Add
            </Button>
          </div>
        </form>
      </Modal2>
    </div>
  );
}

//          <Button
//             onClick={() => handleMedia()}
//             disabled={mediaLoading}
//             variant="primary"
//             className="w-full relative after:rounded-full after:content-[''] after:w-[var(--after-width)] after:absolute after:inset-0 after:bg-red-500"
//             style={{ "--after-width": "0%" } as React.CSSProperties}
//           >
//             <span className='z-10'>{mediaLoading ? "Uploading..." : "Add"}</span>
//           </Button>