!function(){"use strict";function e(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";e.textContent=t?n:r}function t(t,r){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";r.preventDefault();const o=r.submitter,s=o.textContent;e(o,!0,s,n),t().then((()=>r.target.reset())).catch(console.error).finally((()=>e(o,!1,s)))}const r={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__button",inactiveButtonClass:"modal__button_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"};function n(e,t,r){const n=e.querySelector(`#${t.id}-error`);n.textContent="",n.classList.remove(r.errorClass),t.classList.remove(r.inputErrorClass)}function o(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((r=>{n(e,r,t)}))}function s(e,t){0!==e.length&&(e.some((e=>!e.validity.valid))?i(t):a(t))}function a(e){e.disabled=!1}function i(e){e.disabled=!0}const c=new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}_getResult(e){return e.ok?e.json():Promise.reject(`Error: ${e.status}`)}_request(e,t){return fetch(e,t).then(this._getResult)}getInitialCards(){return this._request(`${this._baseUrl}/cards`,{headers:this._headers})}getUser(){return this._request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this._request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editUserAvatar(e){let{avatar:t}=e;return this._request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})})}postCard(e){let{name:t,link:r}=e;return this._request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}removeCard(e){return this._request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}likeCard(e){return this._request(`${this._baseUrl}/cards/${e}/likes`,{method:"PUT",headers:this._headers})}dislikeCard(e){return this._request(`${this._baseUrl}/cards/${e}/likes`,{method:"DELETE",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"6a49bc73-4cbf-41b7-bd3f-9c47b1919869","Content-Type":"application/json"}}),l=document.querySelector(".profile"),d=l.querySelector(".profile__avatar"),u=l.querySelector(".profile__name"),m=l.querySelector(".profile__about"),_=l.querySelector("#profile-btn"),h=l.querySelector("#avatar-btn");function f(e){u.textContent=e.name,m.textContent=e.about}function v(e){d.src=e.avatar}function y(e,t,r){r?t.forEach((e=>{r[e.id]?e.value=r[e.id]:e.reset()})):e.reset()}function S(e){const t={};return e.forEach((e=>{t[e.id]=e.value})),t}let b;function q(e){"Escape"===e.key&&C(b)}function p(e){e.currentTarget===e.target&&C(b)}function E(e){b=e,e.classList.add("modal_opened"),document.addEventListener("keydown",q)}function C(e){e.classList.remove("modal_opened"),document.removeEventListener("keydown",q)}_.addEventListener("click",(function(){y(k,U,{name:u.textContent,about:m.textContent}),o(k,r),i(g),E(L)})),h.addEventListener("click",(function(){E(A)})),c.getUser().then((function(e){f(e),v(e)})).catch(console.error),Array.from(document.querySelectorAll(".modal")).forEach((e=>{e.addEventListener("mousedown",p),e.querySelector(".modal__exit-btn").addEventListener("click",(()=>C(e)))}));const L=document.querySelector("#profile-modal"),k=document.forms["profile-form"],g=L.querySelector(".modal__button"),U=L.querySelectorAll(".modal__input");k.addEventListener("submit",(function(e){t((function(){return c.editUserInfo(S(U)).then((e=>{f(e),i(g),C(L)}))}),e)}));const A=document.querySelector("#avatar-modal"),$=document.forms["avatar-form"],x=A.querySelectorAll(".modal__input");$.addEventListener("submit",(function(e){t((function(){return c.editUserAvatar(S(x)).then((e=>{v(e),y($,x),C(A)}))}),e)}));const T=document.querySelector("#post-modal"),P=document.forms["post-form"],w=T.querySelectorAll(".modal__input");let D,I;P.addEventListener("submit",(function(e){t((function(){return c.postCard(S(w)).then((e=>{G(e),C(T),y(P,w)}))}),e)})),document.querySelector(".profile__post-btn").addEventListener("click",(()=>E(T)));const N=document.querySelector("#delete-modal"),O=document.forms["delete-form"],j=N.querySelector("#delete-btn"),B=N.querySelector("#cancel-btn");O.addEventListener("submit",(function(e){t((function(){return c.removeCard(I).then((()=>{D.remove(),C(N)}))}),e,"Deleting...")})),B.addEventListener("click",(()=>C(N)));const J=document.querySelector("#image-modal"),H=J.querySelector(".modal__image"),R=J.querySelectorAll(".modal__caption"),z="#card-template";function M(e,t){!0===t?e.classList.add("card__like-icon_selected"):e.classList.remove("card__like-icon_selected")}const F=document.querySelector(".card-container");function G(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e,t){const r=e.name,n=e.link,o=e._id;let s=e.isLiked;const i=document.querySelector(t).content.querySelector(".card").cloneNode(!0);i.querySelector(".card__text").textContent=r;const l=i.querySelector(".card__image");l.src=n,l.alt=r,l.addEventListener("click",(()=>{!function(e){H.src=e.link,H.alt=e.name,R.textContent=e.name}(e),E(J)}));const d=i.querySelector(".card__like-icon");return M(d,s),d.addEventListener("click",(()=>{s?(M(d,!1),c.dislikeCard(o).then((()=>{s=!1})).catch(console.error).finally((()=>{M(d,s)}))):(M(d,!0),c.likeCard(o).then((()=>{s=!0})).catch(console.error).finally((()=>{M(d,s)})))})),i.querySelector(".card__trash-icon").addEventListener("click",(()=>{D=i,I=o,a(j),E(N)})),i}(e,z);F[t](r)}var K;c.getInitialCards().then((e=>e.forEach((e=>G(e))))).catch(console.error),K=r,Array.from(document.querySelectorAll(K.formSelector)).forEach((e=>{!function(e,t){const r=Array.from(e.querySelectorAll(t.inputSelector)),a=e.querySelector(t.submitButtonSelector);s(r,a),r.forEach((o=>{o.addEventListener("input",(()=>{!function(e,t,r){t.validity.valid?n(e,t,r):function(e,t,r,n){const o=e.querySelector(`#${t.id}-error`);o.textContent=r,o.classList.add(n.errorClass),t.classList.add(n.inputErrorClass)}(e,t,t.validationMessage,r)}(e,o,t),s(r,a)}))})),e.addEventListener("reset",(()=>{o(e,t),i(a)}))}(e,K)}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoieUJBQUEsU0FBU0EsRUFDUEMsRUFDQUMsR0FHQSxJQUZBQyxFQUFVQyxVQUFBQyxPQUFBLFFBQUFDLElBQUFGLFVBQUEsR0FBQUEsVUFBQSxHQUFHLE9BQ2JHLEVBQVdILFVBQUFDLE9BQUEsUUFBQUMsSUFBQUYsVUFBQSxHQUFBQSxVQUFBLEdBQUcsWUFHWkgsRUFBT08sWUFETE4sRUFDbUJLLEVBRUFKLENBRXpCLENBRU8sU0FBU00sRUFBYUMsRUFBU0MsR0FBZ0MsSUFBM0JKLEVBQVdILFVBQUFDLE9BQUEsUUFBQUMsSUFBQUYsVUFBQSxHQUFBQSxVQUFBLEdBQUcsWUFDdkRPLEVBQUlDLGlCQUVKLE1BQU1DLEVBQWVGLEVBQUlHLFVBQ25CQyxFQUFjRixFQUFhTCxZQUVqQ1IsRUFBY2EsR0FBYyxFQUFNRSxFQUFhUixHQUMvQ0csSUFDR00sTUFBSyxJQUFNTCxFQUFJTSxPQUFPQyxVQUN0QkMsTUFBTUMsUUFBUUMsT0FDZEMsU0FBUSxJQUFNdEIsRUFBY2EsR0FBYyxFQUFPRSxJQUN0RCxDQ3hCTyxNQUFNUSxFQUFXLENBQ3RCQyxhQUFjLGVBQ2RDLGNBQWUsZ0JBQ2ZDLHFCQUFzQixpQkFDdEJDLG9CQUFxQix5QkFDckJDLGdCQUFpQiwwQkFDakJDLFdBQVksd0JDR2QsU0FBU0MsRUFBZUMsRUFBTUMsRUFBT0MsR0FDbkMsTUFBTUMsRUFBZUgsRUFBS0ksY0FBYyxJQUFJSCxFQUFNSSxZQUVsREYsRUFBYTFCLFlBQWMsR0FDM0IwQixFQUFhRyxVQUFVQyxPQUFPTCxFQUFPSixZQUVyQ0csRUFBTUssVUFBVUMsT0FBT0wsRUFBT0wsZ0JBQ2hDLENBVU8sU0FBU1csRUFBb0JSLEVBQU1FLEdBQ3pCTyxNQUFNQyxLQUFLVixFQUFLVyxpQkFBaUJULEVBQU9SLGdCQUVoRGtCLFNBQVNYLElBQ2RGLEVBQWVDLEVBQU1DLEVBQU9DLEVBQU8sR0FFdkMsQ0FFQSxTQUFTVyxFQUFrQkMsRUFBUTVDLEdBQ1gsSUFBbEI0QyxFQUFPeEMsU0FFTXdDLEVBQU9DLE1BQU1kLElBQ3BCQSxFQUFNZSxTQUFTQyxRQUl2QkMsRUFBY2hELEdBRWRpRCxFQUFhakQsR0FFakIsQ0FFTyxTQUFTaUQsRUFBYWpELEdBQzNCQSxFQUFPa0QsVUFBVyxDQUNwQixDQUVPLFNBQVNGLEVBQWNoRCxHQUM1QkEsRUFBT2tELFVBQVcsQ0FDcEIsQ0MxQ0EsTUFBTUMsRUFBTSxJQ1pHLE1BQ2JDLFdBQUFBLENBQVlDLEdBQ1ZDLEtBQUtDLFNBQVdGLEVBQVFHLFFBQ3hCRixLQUFLRyxTQUFXSixFQUFRSyxPQUMxQixDQUVBQyxVQUFBQSxDQUFXQyxHQUNULE9BQUlBLEVBQUlDLEdBQ0NELEVBQUlFLE9BRU5DLFFBQVFDLE9BQU8sVUFBVUosRUFBSUssU0FDdEMsQ0FFQUMsUUFBQUEsQ0FBU0MsRUFBS2QsR0FDWixPQUFPZSxNQUFNRCxFQUFLZCxHQUFTdEMsS0FBS3VDLEtBQUtLLFdBQ3ZDLENBRUFVLGVBQUFBLEdBQ0UsT0FBT2YsS0FBS1ksU0FBUyxHQUFHWixLQUFLQyxpQkFBa0IsQ0FBRUcsUUFBU0osS0FBS0csVUFDakUsQ0FFQWEsT0FBQUEsR0FDRSxPQUFPaEIsS0FBS1ksU0FBUyxHQUFHWixLQUFLQyxvQkFBcUIsQ0FDaERHLFFBQVNKLEtBQUtHLFVBRWxCLENBRUFjLFlBQUFBLENBQVlDLEdBQWtCLElBQWpCLEtBQUVDLEVBQUksTUFBRUMsR0FBT0YsRUFDMUIsT0FBT2xCLEtBQUtZLFNBQVMsR0FBR1osS0FBS0Msb0JBQXFCLENBQ2hEb0IsT0FBUSxRQUNSakIsUUFBU0osS0FBS0csU0FDZG1CLEtBQU1DLEtBQUtDLFVBQVUsQ0FDbkJMLE9BQ0FDLFdBR04sQ0FFQUssY0FBQUEsQ0FBY0MsR0FBYSxJQUFaLE9BQUVDLEdBQVFELEVBQ3ZCLE9BQU8xQixLQUFLWSxTQUFTLEdBQUdaLEtBQUtDLDJCQUE0QixDQUN2RG9CLE9BQVEsUUFDUmpCLFFBQVNKLEtBQUtHLFNBQ2RtQixLQUFNQyxLQUFLQyxVQUFVLENBQ25CRyxZQUdOLENBRUFDLFFBQUFBLENBQVFDLEdBQWlCLElBQWhCLEtBQUVWLEVBQUksS0FBRVcsR0FBTUQsRUFDckIsT0FBTzdCLEtBQUtZLFNBQVMsR0FBR1osS0FBS0MsaUJBQWtCLENBQzdDb0IsT0FBUSxPQUNSakIsUUFBU0osS0FBS0csU0FDZG1CLEtBQU1DLEtBQUtDLFVBQVUsQ0FDbkJMLE9BQ0FXLFVBR04sQ0FFQUMsVUFBQUEsQ0FBV2xELEdBQ1QsT0FBT21CLEtBQUtZLFNBQVMsR0FBR1osS0FBS0Msa0JBQWtCcEIsSUFBTSxDQUNuRHdDLE9BQVEsU0FDUmpCLFFBQVNKLEtBQUtHLFVBRWxCLENBRUE2QixRQUFBQSxDQUFTbkQsR0FDUCxPQUFPbUIsS0FBS1ksU0FBUyxHQUFHWixLQUFLQyxrQkFBa0JwQixVQUFZLENBQ3pEd0MsT0FBUSxNQUNSakIsUUFBU0osS0FBS0csVUFFbEIsQ0FFQThCLFdBQUFBLENBQVlwRCxHQUNWLE9BQU9tQixLQUFLWSxTQUFTLEdBQUdaLEtBQUtDLGtCQUFrQnBCLFVBQVksQ0FDekR3QyxPQUFRLFNBQ1JqQixRQUFTSixLQUFLRyxVQUVsQixHRGxFa0IsQ0FDbEJELFFBQVMsa0RBQ1RFLFFBQVMsQ0FDUDhCLGNBQWUsdUNBQ2YsZUFBZ0Isc0JBS2RDLEVBQVVDLFNBQVN4RCxjQUFjLFlBQ2pDK0MsRUFBU1EsRUFBUXZELGNBQWMsb0JBQy9CdUMsRUFBT2dCLEVBQVF2RCxjQUFjLGtCQUM3QndDLEVBQVFlLEVBQVF2RCxjQUFjLG1CQUM5QnlELEVBQVVGLEVBQVF2RCxjQUFjLGdCQUNoQzBELEVBQVlILEVBQVF2RCxjQUFjLGVBT3hDLFNBQVMyRCxFQUFRQyxHQUNmckIsRUFBS2xFLFlBQWN1RixFQUFLckIsS0FDeEJDLEVBQU1uRSxZQUFjdUYsRUFBS3BCLEtBQzNCLENBRUEsU0FBU3FCLEVBQVVELEdBQ2pCYixFQUFPZSxJQUFNRixFQUFLYixNQUNwQixDQXNCQSxTQUFTZ0IsRUFBZW5FLEVBQU1vRSxFQUFXQyxHQUNuQ0EsRUFDRkQsRUFBVXhELFNBQVNYLElBQ2JvRSxFQUFZcEUsRUFBTUksSUFDcEJKLEVBQU1xRSxNQUFRRCxFQUFZcEUsRUFBTUksSUFFaENKLEVBQU1kLE9BQ1IsSUFHRmEsRUFBS2IsT0FFVCxDQUVBLFNBQVNvRixFQUFlSCxHQUN0QixNQUFNQyxFQUFjLENBQUMsRUFLckIsT0FKQUQsRUFBVXhELFNBQVNYLElBQ2pCb0UsRUFBWXBFLEVBQU1JLElBQU1KLEVBQU1xRSxLQUFLLElBRzlCRCxDQUNULENBR0EsSUFBSUcsRUFFSixTQUFTQyxFQUFhN0YsR0FDSixXQUFaQSxFQUFJOEYsS0FDTkMsRUFBV0gsRUFFZixDQUVBLFNBQVNJLEVBQW1CaEcsR0FDdEJBLEVBQUlpRyxnQkFBa0JqRyxFQUFJTSxRQUM1QnlGLEVBQVdILEVBRWYsQ0FFQSxTQUFTTSxFQUFVQyxHQUNqQlAsRUFBZU8sRUFDZkEsRUFBTXpFLFVBQVUwRSxJQUFJLGdCQUNwQnBCLFNBQVNxQixpQkFBaUIsVUFBV1IsRUFDdkMsQ0FFQSxTQUFTRSxFQUFXSSxHQUNsQkEsRUFBTXpFLFVBQVVDLE9BQU8sZ0JBQ3ZCcUQsU0FBU3NCLG9CQUFvQixVQUFXVCxFQUMxQyxDQXJEQVosRUFBUW9CLGlCQUFpQixTQWR6QixXQUNFZCxFQUFlZ0IsRUFBYUMsRUFBa0IsQ0FDNUN6QyxLQUFNQSxFQUFLbEUsWUFDWG1FLE1BQU9BLEVBQU1uRSxjQUVmK0IsRUFBb0IyRSxFQUFhM0YsR0FDakMwQixFQUFjbUUsR0FDZFAsRUFBVVEsRUFDWixJQU9BeEIsRUFBVW1CLGlCQUFpQixTQUwzQixXQUNFSCxFQUFVUyxFQUNaLElBS0FsRSxFQUFJbUIsVUFBVXZELE1BL0JkLFNBQWlCK0UsR0FDZkQsRUFBUUMsR0FDUkMsRUFBVUQsRUFDWixJQTRCNEI1RSxNQUFNQyxRQUFRQyxPQW9EM0JtQixNQUFNQyxLQUFLa0QsU0FBU2pELGlCQUFpQixXQUM3Q0MsU0FBU21FLElBQ2RBLEVBQU1FLGlCQUFpQixZQUFhTCxHQUVwQkcsRUFBTTNFLGNBQWMsb0JBQzVCNkUsaUJBQWlCLFNBQVMsSUFBTU4sRUFBV0ksSUFBTyxJQUk1RCxNQUFNTyxFQUFlMUIsU0FBU3hELGNBQWMsa0JBQ3RDK0UsRUFBY3ZCLFNBQVM0QixNQUFNLGdCQUM3QkgsRUFBbUJDLEVBQWFsRixjQUFjLGtCQUM5Q2dGLEVBQW1CRSxFQUFhM0UsaUJBQWlCLGlCQWN2RHdFLEVBQVlGLGlCQUFpQixVQVo3QixTQUE2QnJHLEdBUzNCRixHQVJBLFdBQ0UsT0FBTzJDLEVBQUlvQixhQUFhOEIsRUFBZWEsSUFBbUJuRyxNQUFNK0UsSUFDOURELEVBQVFDLEdBQ1I5QyxFQUFjbUUsR0FDZFYsRUFBV1csRUFBYSxHQUU1QixHQUUwQjFHLEVBQzVCLElBS0EsTUFBTTJHLEVBQWMzQixTQUFTeEQsY0FBYyxpQkFDckNxRixFQUFhN0IsU0FBUzRCLE1BQU0sZUFDNUJFLEVBQWtCSCxFQUFZNUUsaUJBQWlCLGlCQWNyRDhFLEVBQVdSLGlCQUFpQixVQVo1QixTQUE0QnJHLEdBUzFCRixHQVJBLFdBQ0UsT0FBTzJDLEVBQUk0QixlQUFlc0IsRUFBZW1CLElBQWtCekcsTUFBTStFLElBQy9EQyxFQUFVRCxHQUNWRyxFQUFlc0IsRUFBWUMsR0FDM0JmLEVBQVdZLEVBQVksR0FFM0IsR0FFMEIzRyxFQUM1QixJQUtBLE1BQU0rRyxFQUFZL0IsU0FBU3hELGNBQWMsZUFDbkN3RixFQUFXaEMsU0FBUzRCLE1BQU0sYUFDMUJLLEVBQWdCRixFQUFVaEYsaUJBQWlCLGlCQW9CakQsSUFBSW1GLEVBQ0FDLEVBUEpILEVBQVNYLGlCQUFpQixVQVoxQixTQUEwQnJHLEdBU3hCRixHQVJBLFdBQ0UsT0FBTzJDLEVBQUkrQixTQUFTbUIsRUFBZXNCLElBQWdCNUcsTUFBTStFLElBQ3ZEZ0MsRUFBV2hDLEdBQ1hXLEVBQVdnQixHQUNYeEIsRUFBZXlCLEVBQVVDLEVBQWMsR0FFM0MsR0FFMEJqSCxFQUM1QixJQUltQmdGLFNBQVN4RCxjQUFjLHNCQUMvQjZFLGlCQUFpQixTQUFTLElBQU1ILEVBQVVhLEtBTXJELE1BQU1NLEVBQWNyQyxTQUFTeEQsY0FBYyxpQkFDckM4RixFQUFhdEMsU0FBUzRCLE1BQU0sZUFDNUJXLEVBQVlGLEVBQVk3RixjQUFjLGVBQ3RDZ0csRUFBWUgsRUFBWTdGLGNBQWMsZUFhNUM4RixFQUFXakIsaUJBQWlCLFVBWDVCLFNBQXNCckcsR0FRcEJGLEdBUEEsV0FDRSxPQUFPMkMsRUFBSWtDLFdBQVd3QyxHQUFlOUcsTUFBSyxLQUN4QzZHLEVBQVl2RixTQUNab0UsRUFBV3NCLEVBQVksR0FFM0IsR0FFMEJySCxFQUFLLGNBQ2pDLElBR0F3SCxFQUFVbkIsaUJBQWlCLFNBQVMsSUFBTU4sRUFBV3NCLEtBR3JELE1BQU1JLEVBQWF6QyxTQUFTeEQsY0FBYyxnQkFDcENrRyxFQUFRRCxFQUFXakcsY0FBYyxpQkFDakNtRyxFQUFVRixFQUFXMUYsaUJBQWlCLG1CQVN0QzZGLEVBQWUsaUJBTXJCLFNBQVNDLEVBQWVDLEVBQVNDLElBQ2YsSUFBWkEsRUFDRkQsRUFBUXBHLFVBQVUwRSxJQUFJLDRCQUV0QjBCLEVBQVFwRyxVQUFVQyxPQUFPLDJCQUU3QixDQWtFQSxNQUFNcUcsRUFBZ0JoRCxTQUFTeEQsY0FBYyxtQkFFN0MsU0FBUzRGLEVBQVdoQyxHQUEwQixJQUFwQm5CLEVBQU14RSxVQUFBQyxPQUFBLFFBQUFDLElBQUFGLFVBQUEsR0FBQUEsVUFBQSxHQUFHLFVBQ2pDLE1BQU13SSxFQW5FUixTQUFvQjdDLEVBQU04QyxHQUN4QixNQUFNQyxFQUFXL0MsRUFBS3JCLEtBQ2hCcUUsRUFBV2hELEVBQUtWLEtBQ2hCMkQsRUFBU2pELEVBQUtrRCxJQUNwQixJQUFJUCxFQUFVM0MsRUFBSzJDLFFBRW5CLE1BQ01RLEVBRFd2RCxTQUFTeEQsY0FBYzBHLEdBakJ4Qk0sUUFBUWhILGNBQWMsU0FBU2lILFdBQVUsR0FvQnhDRixFQUFRL0csY0FBYyxlQUM5QjNCLFlBQWNzSSxFQUV2QixNQUFNTyxFQUFZSCxFQUFRL0csY0FBYyxnQkFDeENrSCxFQUFVcEQsSUFBTThDLEVBQ2hCTSxFQUFVQyxJQUFNUixFQUVoQk8sRUFBVXJDLGlCQUFpQixTQUFTLE1BckN0QyxTQUF3QmpCLEdBQ3RCc0MsRUFBTXBDLElBQU1GLEVBQUtWLEtBQ2pCZ0QsRUFBTWlCLElBQU12RCxFQUFLckIsS0FDakI0RCxFQUFROUgsWUFBY3VGLEVBQUtyQixJQUM3QixDQWtDSTZFLENBQWV4RCxHQUNmYyxFQUFVdUIsRUFBVyxJQUd2QixNQUFNSyxFQUFVUyxFQUFRL0csY0FBYyxvQkF1Q3RDLE9BdENBcUcsRUFBZUMsRUFBU0MsR0FFeEJELEVBQVF6QixpQkFBaUIsU0FBUyxLQUU1QjBCLEdBQ0ZGLEVBQWVDLEdBQVMsR0FDeEJyRixFQUNHb0MsWUFBWXdELEdBQ1poSSxNQUFLLEtBQ0owSCxHQUFVLENBQUssSUFFaEJ2SCxNQUFNQyxRQUFRQyxPQUNkQyxTQUFRLEtBQ1BrSCxFQUFlQyxFQUFTQyxFQUFRLE1BR3BDRixFQUFlQyxHQUFTLEdBQ3hCckYsRUFDR21DLFNBQVN5RCxHQUNUaEksTUFBSyxLQUNKMEgsR0FBVSxDQUFJLElBRWZ2SCxNQUFNQyxRQUFRQyxPQUNkQyxTQUFRLEtBQ1BrSCxFQUFlQyxFQUFTQyxFQUFRLElBRXRDLElBR2VRLEVBQVEvRyxjQUFjLHFCQUU5QjZFLGlCQUFpQixTQUFTLEtBQ2pDYSxFQUFjcUIsRUFDZHBCLEVBQWdCa0IsRUFDaEI5RixFQUFhZ0YsR0FDYnJCLEVBQVVtQixFQUFZLElBR2pCa0IsQ0FDVCxDQU1zQk0sQ0FBV3pELEVBQU13QyxHQUNyQ0ksRUFBYy9ELEdBQVFnRSxFQUN4QixDRC9OTyxJQUEwQjNHLEVDaU9qQ21CLEVBQ0drQixrQkFDQXRELE1BQU15SSxHQUFVQSxFQUFNOUcsU0FBUytHLEdBQVMzQixFQUFXMkIsT0FDbkR2SSxNQUFNQyxRQUFRQyxPRHBPZ0JZLEVDdU9oQlYsRUR0T0RpQixNQUFNQyxLQUFLa0QsU0FBU2pELGlCQUFpQlQsRUFBT1QsZUFDcERtQixTQUFTWixLQXJCakIsU0FBMkJBLEVBQU1FLEdBQy9CLE1BQU1ZLEVBQVNMLE1BQU1DLEtBQUtWLEVBQUtXLGlCQUFpQlQsRUFBT1IsZ0JBQ2pEeEIsRUFBUzhCLEVBQUtJLGNBQWNGLEVBQU9QLHNCQUV6Q2tCLEVBQWtCQyxFQUFRNUMsR0FFMUI0QyxFQUFPRixTQUFTWCxJQUNkQSxFQUFNZ0YsaUJBQWlCLFNBQVMsTUE3Q3BDLFNBQTRCakYsRUFBTUMsRUFBT0MsR0FDbkNELEVBQU1lLFNBQVNDLE1BQ2pCbEIsRUFBZUMsRUFBTUMsRUFBT0MsR0FwQmhDLFNBQXdCRixFQUFNQyxFQUFPMkgsRUFBYzFILEdBQ2pELE1BQU1DLEVBQWVILEVBQUtJLGNBQWMsSUFBSUgsRUFBTUksWUFFbERGLEVBQWExQixZQUFjbUosRUFDM0J6SCxFQUFhRyxVQUFVMEUsSUFBSTlFLEVBQU9KLFlBRWxDRyxFQUFNSyxVQUFVMEUsSUFBSTlFLEVBQU9MLGdCQUM3QixDQWVJZ0ksQ0FBZTdILEVBQU1DLEVBQU9BLEVBQU02SCxrQkFBbUI1SCxFQUV6RCxDQXdDTTZILENBQW1CL0gsRUFBTUMsRUFBT0MsR0FDaENXLEVBQWtCQyxFQUFRNUMsRUFBTyxHQUNqQyxJQUdKOEIsRUFBS2lGLGlCQUFpQixTQUFTLEtBQzdCekUsRUFBb0JSLEVBQU1FLEdBQzFCZ0IsRUFBY2hELEVBQU8sR0FFekIsQ0FLSThKLENBQWtCaEksRUFBTUUsRUFBTyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3BvdHMtcHJvamVjdC8uL3NyYy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9zcG90cy1wcm9qZWN0Ly4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zcG90cy1wcm9qZWN0Ly4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zcG90cy1wcm9qZWN0Ly4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3BvdHMtcHJvamVjdC8uL3NyYy91dGlscy9BcGkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcmVuZGVyTG9hZGluZyhcbiAgYnV0dG9uLFxuICBpc0xvYWRpbmcsXG4gIGJ1dHRvblRleHQgPSBcIlNhdmVcIixcbiAgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiXG4pIHtcbiAgaWYgKGlzTG9hZGluZykge1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0O1xuICB9IGVsc2Uge1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChyZXF1ZXN0LCBldnQsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBzdWJtaXRCdXR0b24gPSBldnQuc3VibWl0dGVyO1xuICBjb25zdCBpbml0aWFsVGV4dCA9IHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudDtcblxuICByZW5kZXJMb2FkaW5nKHN1Ym1pdEJ1dHRvbiwgdHJ1ZSwgaW5pdGlhbFRleHQsIGxvYWRpbmdUZXh0KTtcbiAgcmVxdWVzdCgpXG4gICAgLnRoZW4oKCkgPT4gZXZ0LnRhcmdldC5yZXNldCgpKVxuICAgIC5jYXRjaChjb25zb2xlLmVycm9yKVxuICAgIC5maW5hbGx5KCgpID0+IHJlbmRlckxvYWRpbmcoc3VibWl0QnV0dG9uLCBmYWxzZSwgaW5pdGlhbFRleHQpKTtcbn1cbiIsImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCIsXG59O1xuIiwiZnVuY3Rpb24gc2hvd0lucHV0RXJyb3IoZm9ybSwgaW5wdXQsIGVycm9yTWVzc2FnZSwgY29uZmlnKSB7XG4gIGNvbnN0IGVycm9yRWxlbWVudCA9IGZvcm0ucXVlcnlTZWxlY3RvcihgIyR7aW5wdXQuaWR9LWVycm9yYCk7XG5cbiAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZChjb25maWcuZXJyb3JDbGFzcyk7XG5cbiAgaW5wdXQuY2xhc3NMaXN0LmFkZChjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbn1cblxuZnVuY3Rpb24gaGlkZUlucHV0RXJyb3IoZm9ybSwgaW5wdXQsIGNvbmZpZykge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0LmlkfS1lcnJvcmApO1xuXG4gIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5lcnJvckNsYXNzKTtcblxuICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5pbnB1dEVycm9yQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiBjaGVja0lucHV0VmFsaWRpdHkoZm9ybSwgaW5wdXQsIGNvbmZpZykge1xuICBpZiAoaW5wdXQudmFsaWRpdHkudmFsaWQpIHtcbiAgICBoaWRlSW5wdXRFcnJvcihmb3JtLCBpbnB1dCwgY29uZmlnKTtcbiAgfSBlbHNlIHtcbiAgICBzaG93SW5wdXRFcnJvcihmb3JtLCBpbnB1dCwgaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2UsIGNvbmZpZyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVGb3JtSW5wdXRFcnJvcnMoZm9ybSwgY29uZmlnKSB7XG4gIGNvbnN0IGlucHV0cyA9IEFycmF5LmZyb20oZm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKSk7XG5cbiAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgaGlkZUlucHV0RXJyb3IoZm9ybSwgaW5wdXQsIGNvbmZpZyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dHMsIGJ1dHRvbikge1xuICBpZiAoaW5wdXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIGNvbnN0IG5vdFZhbGlkID0gaW5wdXRzLnNvbWUoKGlucHV0KSA9PiB7XG4gICAgcmV0dXJuICFpbnB1dC52YWxpZGl0eS52YWxpZDtcbiAgfSk7XG5cbiAgaWYgKG5vdFZhbGlkKSB7XG4gICAgZGlzYWJsZUJ1dHRvbihidXR0b24pO1xuICB9IGVsc2Uge1xuICAgIGVuYWJsZUJ1dHRvbihidXR0b24pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVCdXR0b24oYnV0dG9uKSB7XG4gIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZUJ1dHRvbihidXR0b24pIHtcbiAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybSwgY29uZmlnKSB7XG4gIGNvbnN0IGlucHV0cyA9IEFycmF5LmZyb20oZm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKSk7XG4gIGNvbnN0IGJ1dHRvbiA9IGZvcm0ucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xuXG4gIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0cywgYnV0dG9uKTtcblxuICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgY2hlY2tJbnB1dFZhbGlkaXR5KGZvcm0sIGlucHV0LCBjb25maWcpO1xuICAgICAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRzLCBidXR0b24pO1xuICAgIH0pO1xuICB9KTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNldFwiLCAoKSA9PiB7XG4gICAgaGlkZUZvcm1JbnB1dEVycm9ycyhmb3JtLCBjb25maWcpO1xuICAgIGRpc2FibGVCdXR0b24oYnV0dG9uKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVWYWxpZGF0aW9uKGNvbmZpZykge1xuICBjb25zdCBmb3JtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKSk7XG4gIGZvcm1zLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBzZXRFdmVudExpc3RlbmVycyhmb3JtLCBjb25maWcpO1xuICB9KTtcbn1cbiIsImltcG9ydCBcIi4uL3BhZ2VzL2luZGV4LmNzc1wiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vdXRpbHMvQXBpLmpzXCI7XG5pbXBvcnQgeyBoYW5kbGVTdWJtaXQgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHMuanNcIjtcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHtcbiAgaGlkZUZvcm1JbnB1dEVycm9ycyxcbiAgZW5hYmxlVmFsaWRhdGlvbixcbiAgZW5hYmxlQnV0dG9uLFxuICBkaXNhYmxlQnV0dG9uLFxufSBmcm9tIFwiLi92YWxpZGF0aW9uLmpzXCI7XG5cbi8vIEFwaVxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQtYXBpLmVuLnRyaXBsZXRlbi1zZXJ2aWNlcy5jb20vdjFcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiNmE0OWJjNzMtNGNiZi00MWI3LWJkM2YtOWM0N2IxOTE5ODY5XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuLy8gUHJvZmlsZVxuY29uc3QgcHJvZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZVwiKTtcbmNvbnN0IGF2YXRhciA9IHByb2ZpbGUucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG5jb25zdCBuYW1lID0gcHJvZmlsZS5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG5jb25zdCBhYm91dCA9IHByb2ZpbGUucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hYm91dFwiKTtcbmNvbnN0IGVkaXRCdG4gPSBwcm9maWxlLnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1idG5cIik7XG5jb25zdCBhdmF0YXJCdG4gPSBwcm9maWxlLnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLWJ0blwiKTtcblxuZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gIHNldEluZm8oZGF0YSk7XG4gIHNldEF2YXRhcihkYXRhKTtcbn1cblxuZnVuY3Rpb24gc2V0SW5mbyhkYXRhKSB7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIGFib3V0LnRleHRDb250ZW50ID0gZGF0YS5hYm91dDtcbn1cblxuZnVuY3Rpb24gc2V0QXZhdGFyKGRhdGEpIHtcbiAgYXZhdGFyLnNyYyA9IGRhdGEuYXZhdGFyO1xufVxuXG5mdW5jdGlvbiBvbkluZm9FZGl0KCkge1xuICBzZXRJbnB1dFZhbHVlcyhwcm9maWxlRm9ybSwgcHJvZmlsZUlucHV0TGlzdCwge1xuICAgIG5hbWU6IG5hbWUudGV4dENvbnRlbnQsXG4gICAgYWJvdXQ6IGFib3V0LnRleHRDb250ZW50LFxuICB9KTtcbiAgaGlkZUZvcm1JbnB1dEVycm9ycyhwcm9maWxlRm9ybSwgc2V0dGluZ3MpO1xuICBkaXNhYmxlQnV0dG9uKHByb2ZpbGVTdWJtaXRCdG4pO1xuICBvcGVuTW9kYWwocHJvZmlsZU1vZGFsKTtcbn1cblxuZnVuY3Rpb24gb25BdmF0YXJFZGl0KCkge1xuICBvcGVuTW9kYWwoYXZhdGFyTW9kYWwpO1xufVxuXG5lZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkluZm9FZGl0KTtcbmF2YXRhckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25BdmF0YXJFZGl0KTtcblxuYXBpLmdldFVzZXIoKS50aGVuKHNldERhdGEpLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuXG4vLyBGb3JtXG5mdW5jdGlvbiBzZXRJbnB1dFZhbHVlcyhmb3JtLCBpbnB1dExpc3QsIGlucHV0VmFsdWVzKSB7XG4gIGlmIChpbnB1dFZhbHVlcykge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaWYgKGlucHV0VmFsdWVzW2lucHV0LmlkXSkge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGlucHV0VmFsdWVzW2lucHV0LmlkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LnJlc2V0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5yZXNldCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldElucHV0VmFsdWVzKGlucHV0TGlzdCkge1xuICBjb25zdCBpbnB1dFZhbHVlcyA9IHt9O1xuICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBpbnB1dFZhbHVlc1tpbnB1dC5pZF0gPSBpbnB1dC52YWx1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGlucHV0VmFsdWVzO1xufVxuXG4vLyBNb2RhbFxubGV0IGN1cnJlbnRNb2RhbDtcblxuZnVuY3Rpb24gaGFuZGVsRXNjYXBlKGV2dCkge1xuICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgIGNsb3NlTW9kYWwoY3VycmVudE1vZGFsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kZWxPdXRzaWRlQ2xpY2soZXZ0KSB7XG4gIGlmIChldnQuY3VycmVudFRhcmdldCA9PT0gZXZ0LnRhcmdldCkge1xuICAgIGNsb3NlTW9kYWwoY3VycmVudE1vZGFsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgY3VycmVudE1vZGFsID0gbW9kYWw7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRlbEVzY2FwZSk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGVsRXNjYXBlKTtcbn1cblxuY29uc3QgbW9kYWxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsXCIpKTtcbm1vZGFscy5mb3JFYWNoKChtb2RhbCkgPT4ge1xuICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRlbE91dHNpZGVDbGljayk7XG5cbiAgY29uc3QgZXhpdEJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2V4aXQtYnRuXCIpO1xuICBleGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZU1vZGFsKG1vZGFsKSk7XG59KTtcblxuLy8gUHJvZmlsZSBNb2RhbFxuY29uc3QgcHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLW1vZGFsXCIpO1xuY29uc3QgcHJvZmlsZUZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcInByb2ZpbGUtZm9ybVwiXTtcbmNvbnN0IHByb2ZpbGVTdWJtaXRCdG4gPSBwcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuY29uc3QgcHJvZmlsZUlucHV0TGlzdCA9IHByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19pbnB1dFwiKTtcblxuZnVuY3Rpb24gb25Qcm9maWxlRm9ybVN1Ym1pdChldnQpIHtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5lZGl0VXNlckluZm8oZ2V0SW5wdXRWYWx1ZXMocHJvZmlsZUlucHV0TGlzdCkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHNldEluZm8oZGF0YSk7XG4gICAgICBkaXNhYmxlQnV0dG9uKHByb2ZpbGVTdWJtaXRCdG4pO1xuICAgICAgY2xvc2VNb2RhbChwcm9maWxlTW9kYWwpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQpO1xufVxuXG5wcm9maWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIG9uUHJvZmlsZUZvcm1TdWJtaXQpO1xuXG4vLyBBdmF0YXIgTW9kYWxcbmNvbnN0IGF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItbW9kYWxcIik7XG5jb25zdCBhdmF0YXJGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJhdmF0YXItZm9ybVwiXTtcbmNvbnN0IGF2YXRhcklucHV0TGlzdCA9IGF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWxfX2lucHV0XCIpO1xuXG5mdW5jdGlvbiBvbkF2YXRhckZvcm1TdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZWRpdFVzZXJBdmF0YXIoZ2V0SW5wdXRWYWx1ZXMoYXZhdGFySW5wdXRMaXN0KSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgc2V0QXZhdGFyKGRhdGEpO1xuICAgICAgc2V0SW5wdXRWYWx1ZXMoYXZhdGFyRm9ybSwgYXZhdGFySW5wdXRMaXN0KTtcbiAgICAgIGNsb3NlTW9kYWwoYXZhdGFyTW9kYWwpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQpO1xufVxuXG5hdmF0YXJGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgb25BdmF0YXJGb3JtU3VibWl0KTtcblxuLy8gUG9zdCBNb2RhbFxuY29uc3QgcG9zdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb3N0LW1vZGFsXCIpO1xuY29uc3QgcG9zdEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcInBvc3QtZm9ybVwiXTtcbmNvbnN0IHBvc3RJbnB1dExpc3QgPSBwb3N0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9faW5wdXRcIik7XG5cbmZ1bmN0aW9uIG9uUG9zdEZvcm1TdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkucG9zdENhcmQoZ2V0SW5wdXRWYWx1ZXMocG9zdElucHV0TGlzdCkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoZGF0YSk7XG4gICAgICBjbG9zZU1vZGFsKHBvc3RNb2RhbCk7XG4gICAgICBzZXRJbnB1dFZhbHVlcyhwb3N0Rm9ybSwgcG9zdElucHV0TGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbnBvc3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgb25Qb3N0Rm9ybVN1Ym1pdCk7XG5cbmNvbnN0IHBvc3RBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3Bvc3QtYnRuXCIpO1xucG9zdEFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gb3Blbk1vZGFsKHBvc3RNb2RhbCkpO1xuXG4vLyBEZWxldGUgTW9kYWxcbmxldCBjdXJyZW50Q2FyZDtcbmxldCBjdXJyZW50Q2FyZElkO1xuXG5jb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuY29uc3QgZGVsZXRlRm9ybSA9IGRvY3VtZW50LmZvcm1zW1wiZGVsZXRlLWZvcm1cIl07XG5jb25zdCBkZWxldGVCdG4gPSBkZWxldGVNb2RhbC5xdWVyeVNlbGVjdG9yKGAjZGVsZXRlLWJ0bmApO1xuY29uc3QgY2FuY2VsQnRuID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihgI2NhbmNlbC1idG5gKTtcblxuZnVuY3Rpb24gb25EZWxldGVDYXJkKGV2dCkge1xuICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICByZXR1cm4gYXBpLnJlbW92ZUNhcmQoY3VycmVudENhcmRJZCkudGhlbigoKSA9PiB7XG4gICAgICBjdXJyZW50Q2FyZC5yZW1vdmUoKTtcbiAgICAgIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQsIFwiRGVsZXRpbmcuLi5cIik7XG59XG5cbmRlbGV0ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBvbkRlbGV0ZUNhcmQpO1xuY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKSk7XG5cbi8vIEltYWdlIE1vZGFsXG5jb25zdCBpbWFnZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbWFnZS1tb2RhbFwiKTtcbmNvbnN0IGltYWdlID0gaW1hZ2VNb2RhbC5xdWVyeVNlbGVjdG9yKGAubW9kYWxfX2ltYWdlYCk7XG5jb25zdCBjYXB0aW9uID0gaW1hZ2VNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKGAubW9kYWxfX2NhcHRpb25gKTtcblxuZnVuY3Rpb24gbG9hZE1vZGFsSW1hZ2UoZGF0YSkge1xuICBpbWFnZS5zcmMgPSBkYXRhLmxpbms7XG4gIGltYWdlLmFsdCA9IGRhdGEubmFtZTtcbiAgY2FwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbn1cblxuLy8gQ2FyZFxuY29uc3QgY2FyZFRlbXBsYXRlID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xuXG5mdW5jdGlvbiBnZXRDYXJkVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpLmNsb25lTm9kZSh0cnVlKTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlQ2FyZExpa2UobGlrZUJ0biwgaXNMaWtlZCkge1xuICBpZiAoaXNMaWtlZCA9PT0gdHJ1ZSkge1xuICAgIGxpa2VCdG4uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtaWNvbl9zZWxlY3RlZFwiKTtcbiAgfSBlbHNlIHtcbiAgICBsaWtlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlLWljb25fc2VsZWN0ZWRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2FyZChkYXRhLCBzZWxlY3Rvcikge1xuICBjb25zdCBjYXJkTmFtZSA9IGRhdGEubmFtZTtcbiAgY29uc3QgY2FyZExpbmsgPSBkYXRhLmxpbms7XG4gIGNvbnN0IGNhcmRJZCA9IGRhdGEuX2lkO1xuICBsZXQgaXNMaWtlZCA9IGRhdGEuaXNMaWtlZDtcblxuICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICBjb25zdCBlbGVtZW50ID0gZ2V0Q2FyZFRlbXBsYXRlKHRlbXBsYXRlKTtcblxuICBjb25zdCBjYXJkVGV4dCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190ZXh0XCIpO1xuICBjYXJkVGV4dC50ZXh0Q29udGVudCA9IGNhcmROYW1lO1xuXG4gIGNvbnN0IGNhcmRJbWFnZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgY2FyZEltYWdlLnNyYyA9IGNhcmRMaW5rO1xuICBjYXJkSW1hZ2UuYWx0ID0gY2FyZE5hbWU7XG5cbiAgY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbG9hZE1vZGFsSW1hZ2UoZGF0YSk7XG4gICAgb3Blbk1vZGFsKGltYWdlTW9kYWwpO1xuICB9KTtcblxuICBjb25zdCBsaWtlQnRuID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtaWNvblwiKTtcbiAgZW5hYmxlQ2FyZExpa2UobGlrZUJ0biwgaXNMaWtlZCk7XG5cbiAgbGlrZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vIFdpbGwgcmV2ZXJ0IHRoZSBsaWtlcyBhcHBlcmFuY2UgaWYgaXQgd2Fzbid0IGFibGUgdG8gc2VuZCB0byB0aGUgc2VydmVyXG4gICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgIGVuYWJsZUNhcmRMaWtlKGxpa2VCdG4sIGZhbHNlKTtcbiAgICAgIGFwaVxuICAgICAgICAuZGlzbGlrZUNhcmQoY2FyZElkKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgaXNMaWtlZCA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIGVuYWJsZUNhcmRMaWtlKGxpa2VCdG4sIGlzTGlrZWQpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW5hYmxlQ2FyZExpa2UobGlrZUJ0biwgdHJ1ZSk7XG4gICAgICBhcGlcbiAgICAgICAgLmxpa2VDYXJkKGNhcmRJZClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGlzTGlrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIGVuYWJsZUNhcmRMaWtlKGxpa2VCdG4sIGlzTGlrZWQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHRyYXNoQnRuID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RyYXNoLWljb25cIik7XG5cbiAgdHJhc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjdXJyZW50Q2FyZCA9IGVsZW1lbnQ7XG4gICAgY3VycmVudENhcmRJZCA9IGNhcmRJZDtcbiAgICBlbmFibGVCdXR0b24oZGVsZXRlQnRuKTtcbiAgICBvcGVuTW9kYWwoZGVsZXRlTW9kYWwpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuLy8gQ2FyZCBDb250YWluZXJcbmNvbnN0IGNhcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmQtY29udGFpbmVyXCIpO1xuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGRhdGEsIG1ldGhvZCA9IFwicHJlcGVuZFwiKSB7XG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZChkYXRhLCBjYXJkVGVtcGxhdGUpO1xuICBjYXJkQ29udGFpbmVyW21ldGhvZF0oY2FyZEVsZW1lbnQpO1xufVxuXG5hcGlcbiAgLmdldEluaXRpYWxDYXJkcygpXG4gIC50aGVuKChjYXJkcykgPT4gY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4gcmVuZGVyQ2FyZChjYXJkKSkpXG4gIC5jYXRjaChjb25zb2xlLmVycm9yKTtcblxuLy8gVmFsaWRhdGlvblxuZW5hYmxlVmFsaWRhdGlvbihzZXR0aW5ncyk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICB9XG5cbiAgX2dldFJlc3VsdChyZXMpIHtcbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICB9XG5cbiAgX3JlcXVlc3QodXJsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucykudGhlbih0aGlzLl9nZXRSZXN1bHQpO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwgeyBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzIH0pO1xuICB9XG5cbiAgZ2V0VXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBlZGl0VXNlckluZm8oeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGFib3V0LFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBlZGl0VXNlckF2YXRhcih7IGF2YXRhciB9KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIHBvc3RDYXJkKHsgbmFtZSwgbGluayB9KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbGluayxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ2FyZChpZCkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGxpa2VDYXJkKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgZGlzbGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJyZW5kZXJMb2FkaW5nIiwiYnV0dG9uIiwiaXNMb2FkaW5nIiwiYnV0dG9uVGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImxvYWRpbmdUZXh0IiwidGV4dENvbnRlbnQiLCJoYW5kbGVTdWJtaXQiLCJyZXF1ZXN0IiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJzdWJtaXRCdXR0b24iLCJzdWJtaXR0ZXIiLCJpbml0aWFsVGV4dCIsInRoZW4iLCJ0YXJnZXQiLCJyZXNldCIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZmluYWxseSIsInNldHRpbmdzIiwiZm9ybVNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJoaWRlSW5wdXRFcnJvciIsImZvcm0iLCJpbnB1dCIsImNvbmZpZyIsImVycm9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVGb3JtSW5wdXRFcnJvcnMiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInRvZ2dsZUJ1dHRvblN0YXRlIiwiaW5wdXRzIiwic29tZSIsInZhbGlkaXR5IiwidmFsaWQiLCJkaXNhYmxlQnV0dG9uIiwiZW5hYmxlQnV0dG9uIiwiZGlzYWJsZWQiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJ0aGlzIiwiX2Jhc2VVcmwiLCJiYXNlVXJsIiwiX2hlYWRlcnMiLCJoZWFkZXJzIiwiX2dldFJlc3VsdCIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJfcmVxdWVzdCIsInVybCIsImZldGNoIiwiZ2V0SW5pdGlhbENhcmRzIiwiZ2V0VXNlciIsImVkaXRVc2VySW5mbyIsIl9yZWYiLCJuYW1lIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVkaXRVc2VyQXZhdGFyIiwiX3JlZjIiLCJhdmF0YXIiLCJwb3N0Q2FyZCIsIl9yZWYzIiwibGluayIsInJlbW92ZUNhcmQiLCJsaWtlQ2FyZCIsImRpc2xpa2VDYXJkIiwiYXV0aG9yaXphdGlvbiIsInByb2ZpbGUiLCJkb2N1bWVudCIsImVkaXRCdG4iLCJhdmF0YXJCdG4iLCJzZXRJbmZvIiwiZGF0YSIsInNldEF2YXRhciIsInNyYyIsInNldElucHV0VmFsdWVzIiwiaW5wdXRMaXN0IiwiaW5wdXRWYWx1ZXMiLCJ2YWx1ZSIsImdldElucHV0VmFsdWVzIiwiY3VycmVudE1vZGFsIiwiaGFuZGVsRXNjYXBlIiwia2V5IiwiY2xvc2VNb2RhbCIsImhhbmRlbE91dHNpZGVDbGljayIsImN1cnJlbnRUYXJnZXQiLCJvcGVuTW9kYWwiLCJtb2RhbCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHJvZmlsZUZvcm0iLCJwcm9maWxlSW5wdXRMaXN0IiwicHJvZmlsZVN1Ym1pdEJ0biIsInByb2ZpbGVNb2RhbCIsImF2YXRhck1vZGFsIiwiZm9ybXMiLCJhdmF0YXJGb3JtIiwiYXZhdGFySW5wdXRMaXN0IiwicG9zdE1vZGFsIiwicG9zdEZvcm0iLCJwb3N0SW5wdXRMaXN0IiwiY3VycmVudENhcmQiLCJjdXJyZW50Q2FyZElkIiwicmVuZGVyQ2FyZCIsImRlbGV0ZU1vZGFsIiwiZGVsZXRlRm9ybSIsImRlbGV0ZUJ0biIsImNhbmNlbEJ0biIsImltYWdlTW9kYWwiLCJpbWFnZSIsImNhcHRpb24iLCJjYXJkVGVtcGxhdGUiLCJlbmFibGVDYXJkTGlrZSIsImxpa2VCdG4iLCJpc0xpa2VkIiwiY2FyZENvbnRhaW5lciIsImNhcmRFbGVtZW50Iiwic2VsZWN0b3IiLCJjYXJkTmFtZSIsImNhcmRMaW5rIiwiY2FyZElkIiwiX2lkIiwiZWxlbWVudCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJjYXJkSW1hZ2UiLCJhbHQiLCJsb2FkTW9kYWxJbWFnZSIsImNyZWF0ZUNhcmQiLCJjYXJkcyIsImNhcmQiLCJlcnJvck1lc3NhZ2UiLCJzaG93SW5wdXRFcnJvciIsInZhbGlkYXRpb25NZXNzYWdlIiwiY2hlY2tJbnB1dFZhbGlkaXR5Iiwic2V0RXZlbnRMaXN0ZW5lcnMiXSwic291cmNlUm9vdCI6IiJ9