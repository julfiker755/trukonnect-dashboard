'use client';
import Avatars from '@/components/reuseable/avater';
import { CloseIcon } from '@/components/reuseable/btn';
import FlagBox from '@/components/reuseable/flag-box';
import Modal2 from '@/components/reuseable/modal2';
import { Pagination } from '@/components/reuseable/pagination';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Badge, Button, TableCell, TableRow, Textarea } from '@/components/ui';
import { useAssignAdminMutation, useGetSupportQuery, useStoreReplayMutation } from '@/redux/api/reviewer/supportApi';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useFormFields, useGlobalState } from '@/hooks';
import FavIcon from '@/icon/favIcon';
import { helpers } from '@/lib';
import { CircleAlert } from 'lucide-react';
import sonner from '@/components/reuseable/sonner';
import { ImageGallery } from '@/components/reuseable/image-gallery';
import { ImgBox } from '@/components/reuseable/Img-box';


const initGlobal: any = {
  page: 1,
  search: "",
  details: {},
}


export default function Support() {
  const [isPreview, setIsPreview] = useState(false);
  const [global, setGlobal] = useGlobalState(initGlobal)
  const headers = ['User', 'Role', 'Email', 'Region', 'Contact', 'Action'];
  const [value] = useDebounce(global.search, 1000);
  const { data: support, isLoading } = useGetSupportQuery({
    page: global.page,
    ...(value && { search: value }),
  })
  const [assignAdmin, { isLoading: assignLoading }] = useAssignAdminMutation()
  const [storeReplay, { isLoading: storeLoading }] = useStoreReplayMutation()
  const id = global?.details?.id
  //   === replay ===
  const replayForm = useFormFields({
    reply: '',
  });

  const handleSubmitReject = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = replayForm.validate({
      reply: 'Reply is required',
    });
    if (!ok) return;
    const value = {
      reply: replayForm.formData.reply,
      user_id: global?.details?.ticketcreator?.id,
      _method: 'PUT',
    }
    const data = helpers.fromData(value);
    const res = await storeReplay({ id, data }).unwrap();
    if (res.status) {
      setIsPreview(false);
      replayForm.reset();
      sonner.success("Reply Successful", "Your reply has been successfully.", "bottom-right");;
    }
  };



  return (
    <div>
      <Navber
        title="Support"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => setGlobal("search", text)} />
          </>
        }
      />
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-0" />
          ) : support?.data?.length > 0 ? (
            support?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={helpers.imgSource(item?.ticketcreator?.avatar) || '/avater.png'}
                      fallback={item?.ticketcreator?.name}
                      alt={item?.ticketcreator?.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.ticketcreator?.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={helpers.lowerCase(item?.ticketcreator?.role) as any}>
                    {helpers.capitalize(item?.ticketcreator?.role)}
                  </Badge>
                </TableCell>
                <TableCell>{item?.ticketcreator?.email}</TableCell>
                <TableCell>{<FlagBox label={false} href={item?.ticketcreator?.country?.flag} />}</TableCell>
                <TableCell>{item?.ticketcreator.phone}</TableCell>
                <TableCell>
                  <h1
                    onClick={() => {
                      setIsPreview(!isPreview)
                      setGlobal("details", item)
                    }}
                    className="flex justify-center cursor-pointer"
                  >
                    {' '}
                    <FavIcon name="eye" />
                  </h1>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No support  are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
        <Pagination onClick={(v: any) => setGlobal("page", v)} {...support?.meta}></Pagination>
      </div>
      {/* ===== account varification prieview======= */}
      <Modal2 open={isPreview} setIsOpen={setIsPreview}>
        <form onSubmit={handleSubmitReject} className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-xl">{global?.details?.subject}</h1>
            <CloseIcon className="static" onClose={() => {
              setIsPreview(false)
              replayForm.reset()
            }} />
          </div>
          <p className="text-figma-gray">
            {global?.details?.issue}
          </p>
          {global?.details?.attachments?.length > 0 ? (
            <div>
              <ImageGallery images={global?.details?.attachments}>
                <div className="grid grid-cols-4 gap-10">
                  {global?.details?.attachments?.slice(0, 4)?.map((item: any, index: any) => (
                    <ImgBox key={index} src={helpers.imgSource(item) || "/blur.png"} alt="photo2" className="w-[70px] h-[100px] mx-auto" />
                  ))}
                </div>
              </ImageGallery>
            </div>
          ) : (<h1 className='text-sm text-figma-gray'>No attachments Picture</h1>)}


          <div>
            <h1 className="font-medium text-lg mb-1">Your reply*</h1>
            <div>
              <Textarea
                className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
                placeholder="Write additional note"
                value={replayForm.formData.reply}
                onChange={(e) => replayForm.change('reply', e.target.value)}
              />
              {replayForm?.errors?.reply && (
                <p className="text-red-500 flex justify-end items-center text-right">
                  <span className="mr-1"> {replayForm?.errors?.reply}</span>{' '}
                  <CircleAlert size={14} />
                </p>
              )}
            </div>
          </div>
          <Button onClick={async () => {
            const data = helpers.fromData({ _method: "PUT" })
            const res = await assignAdmin({ id, data })
            if (res?.data?.status) {
              setIsPreview(false)
              sonner.success("Assign Successful", "Admin has been assign successfully", "bottom-right");
            }
          }} disabled={assignLoading} type='button' variant="secondary" className="w-full">
            Escalate to admin
          </Button>
          <Button disabled={storeLoading
          } variant="primary" className="w-full">
            Send
          </Button>
        </form>
      </Modal2>
    </div>
  );
}
