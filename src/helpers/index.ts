import moment from "moment";
import _ from "lodash";
import { useEffect, useState, useRef } from "react";

export function isNumeric(value: any) {
  return /^-{0,1}\d+$/.test(value);
}
export function isString(str: any) {
  let isStr = false;
  if (str && typeof str === "string") {
    isStr = true;
  }
  return isStr;
}
export const isEmailValid = function (str: any) {
  let emailValid = false;
  if (isString(str)) {
    if (str.match(/[a-z0-9_+\-.]+@[a-z0-9_\-.]+\.[a-z]+/i)) {
      emailValid = true;
    }
  }
  return emailValid;
};
export function buildFormData(formData: any, data: any, parentKey?: string) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        formData.append(`${parentKey}[]`, data[i]);
      }
    } else {
      Object.keys(data).forEach((key) => {
        const fieldKey = isNumeric(key) ? "[]" : `[${key}]`;
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}${fieldKey}` : key
        );
      });
    }
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}

export function objectToFormData(data: any) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

export const formatSqlDate = (date: string, noTime?: boolean): string => {
  if (!date) return "";
  if (!noTime) {
    return moment(date).local().format("DD/MM/YYYY HH:mm");
  }
  return moment(date).local().format("DD/MM/YYYY");
};

export const useDebounce = (value: any, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};

export const checkAccessParent = (accessible: any, mod: string) => {
  if (!accessible) {
    return true;
  }
  if (accessible[mod]) {
    if (!accessible[mod].length) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const checkAccess = (accessible: any, mod: string, action = "view") => {
  if (!accessible) {
    return true;
  }
  if (accessible[mod]) {
    if (_.indexOf(accessible[mod], action) === -1) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  return ref.current;
};

export const timer = (seconds: number): string => {
  let min = "00";
  let sec = seconds < 10 ? "0" + String(seconds) : String(seconds);
  if (seconds >= 60) {
    const secs = seconds % 60;
    sec = secs < 10 ? "0" + String(secs) : String(secs);
    const mins = Math.floor(seconds / 60);
    min = mins < 10 ? "0" + String(mins) : String(mins);
  }
  return min + ":" + sec;
};

export const isNewerVersion = (oldVer: string, newVer: string) => {
  const oldParts = oldVer.split(".");
  const newParts = newVer.split(".");
  for (var i = 0; i < newParts.length; i++) {
    const a = ~~newParts[i]; // parse int
    const b = ~~oldParts[i]; // parse int
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
};
