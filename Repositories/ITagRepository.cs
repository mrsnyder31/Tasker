﻿using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
    }
}