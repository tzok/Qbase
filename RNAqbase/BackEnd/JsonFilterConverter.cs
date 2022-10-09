using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RNAqbase.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace RNAqbase.BackEnd
{
    public class JsonFilterConverter : JsonCreationConverter<Filter>
    {
        protected override Filter Create(Type objectType, JObject jObject)
        {
            switch (jObject["Attribute"].ToString())
            {
                case "Experimental Method":
                    return new ExperimentalMethodFilter();
                default:
                    return null;
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
        }
    }

    public abstract class JsonCreationConverter<T> : JsonConverter
    {
        protected abstract T Create(Type objectType, JObject jObject);

        public override bool CanConvert(Type objectType)
        {
            return typeof(T).IsAssignableFrom(objectType);
        }
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject jObject = JObject.Load(reader);
            T target = Create(objectType, jObject);
            serializer.Populate(jObject.CreateReader(), target);
            return target;
        }
    }
}
