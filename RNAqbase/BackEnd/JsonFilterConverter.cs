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
            // This is the important part - we can query what json properties are present
            // to figure out what type of object to construct and populate
            
            if (FieldExists("amount", jObject))
            {
                return new Wheel();
            }
            else if (FieldExists("delay", jObject))
            {
                return new Break();
            }
            else
            {
                return null;
            }
        }

        private bool FieldExists(string fieldName, JObject jObject)
        {
            return jObject[fieldName] != null;
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
            // Load JObject from stream
            JObject jObject = JObject.Load(reader);

            // Create target object based on JObject
            T target = Create(objectType, jObject);

            // Populate the object properties
            serializer.Populate(jObject.CreateReader(), target);

            return target;
        }
    }
}
