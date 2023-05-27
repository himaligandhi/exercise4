import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  BaseForm,
  PerForm,
  PostingsRouteParams,
  postingsRoutes,
  postingsService,
  utils,
} from '..';
import schema, { fromFormValues, toFormValues } from './schema';

export default function Edit() {
  const [posting, setPosting] = useState<BaseForm>(toFormValues());
  const { id } = useParams<PostingsRouteParams>();
  const history = useHistory();
  const { formatDate } = utils;

  function handleCancel() {
    history.push(`${postingsRoutes.root.path}/${id}`);
  }

  function handleFormChanges(field: string, value: any) {
    setPosting((currentPosting) => ({ ...currentPosting, [field]: value }));
  }

  function handleSubmit() {
    postingsService.updatePosting(id, fromFormValues(posting));
  }

  useEffect(() => {
    postingsService.getPosting(id, (posting) => {
      setPosting(toFormValues(posting));
    });
  }, [formatDate, id]);

  return (
    <div>
      <PerForm
        schema={schema}
        value={posting}
        onCancel={handleCancel}
        onChange={handleFormChanges}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
